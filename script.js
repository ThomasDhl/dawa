document.addEventListener('DOMContentLoaded', function() {
    const gameForm = document.getElementById('gameForm');
    const playerItems = document.getElementById('playerItems');
    
    // 从本地存储加载玩家列表
    let players = JSON.parse(localStorage.getItem('players')) || [];
    
    // 渲染玩家列表
    function renderPlayers() {
        playerItems.innerHTML = '';
        players.forEach((player, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${player.name} (ID: ${player.id})</span>
                <button class="delete-btn" data-index="${index}">删除</button>
            `;
            playerItems.appendChild(li);
        });
        
        // 添加删除按钮事件监听
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', deletePlayer);
        });
    }
    
    // 删除玩家
    function deletePlayer(e) {
        const index = e.target.dataset.index;
        players.splice(index, 1);
        localStorage.setItem('players', JSON.stringify(players));
        renderPlayers();
    }
    
    // 表单提交
    gameForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const gameId = document.getElementById('gameId').value.trim();
        const playerName = document.getElementById('playerName').value.trim();
        
        if (gameId && playerName) {
            // 添加新玩家
            players.push({
                id: gameId,
                name: playerName,
                date: new Date().toLocaleString()
            });
            
            // 保存到本地存储
            localStorage.setItem('players', JSON.stringify(players));
            
            // 清空表单
            gameForm.reset();
            
            // 重新渲染列表
            renderPlayers();
        }
    });
    
    // 初始渲染
    renderPlayers();
});
