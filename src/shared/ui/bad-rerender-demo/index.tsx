import { useState, useEffect, useCallback, useMemo, memo } from 'react';

type User = {
    id: number;
    name: string;
};

const heavyCalculation = (num: number) => {
    console.log('Тяжелое вычисление...');
    let result = 0;
    for (let i = 0; i < 100000000; i++) {
        result += i;
    }
    return result + num;
};

const UserItem = memo(({ user, onClick }: { user: User; onClick: () => void }) => {
    console.log(`Рендер UserItem: ${user.name}`);
    
    return (
        <div onClick={onClick} style={{ padding: '8px', border: '1px solid #ccc', margin: '4px', cursor: 'pointer' }}>
            {user.name}
        </div>
    );
});

const UserList = ({ users, onUserClick }: { users: User[]; onUserClick: (id: number) => void }) => {
    console.log('Рендер UserList');
    
    return (
        <div>
            {users.map((user) => (
                <UserItem
                    key={user.id}
                    user={user}
                    onClick={() => onUserClick(user.id)}
                />
            ))}
        </div>
    );
};

export const BadRerenderDemo = () => {
    console.log('Рендер BadRerenderDemo');
    
    const [count, setCount] = useState(0);
    const [text, setText] = useState('');
    const [users, setUsers] = useState<User[]>([
        { id: 1, name: 'Анна' },
        { id: 2, name: 'Иван' },
        { id: 3, name: 'Мария' },
    ]);
    
    const result = useMemo(() => heavyCalculation(count), [count]);
    
    // раньше было function handleUserClick(id) { setUsers(users.map(...)) }
    // теперь функция не пересоздается при каждом рендере
    const handleUserClick = useCallback((id: number) => {
        console.log(`Клик по пользователю ${id}`);
        setUsers(prevUsers => prevUsers.map(user => 
            user.id === id ? { ...user, name: user.name + '!' } : user
        ));
    }, []);
    
    const addUser = () => {
        const newId = users.length + 1;
        setUsers([...users, { id: newId, name: `Новый ${newId}` }]);
    };
    
    // Было const getActiveUsers = () => {...}; const activeUsers = getActiveUsers();
    // убрала лишнюю функцию и теперь фильтруется напрямую 
    const activeUsers = users.filter(user => user.name.length > 0);
    
    // Было: useEffect(() => {...}) - без зависимостей, срабатывал после каждого рендера
    // Стало: добавила [count] - срабатывает только когда count меняется
    useEffect(() => {
        console.log('useEffect сработал');
        document.title = `Счетчик: ${count}`;
    }, [count]);
    
    return (
        <div>
            <h3>Компонент с проблемами ререндера</h3>
            
            <div>
                <p>Счетчик: {count}</p>
                <button onClick={() => setCount(count + 1)}>
                    Увеличить счетчик
                </button>
            </div>
            
            <div>
                <p>Текст: {text}</p>
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Введите текст..."
                />
            </div>
            
            <div>
                <button onClick={addUser}>Добавить пользователя</button>
            </div>
            
            <div>
                <p>Результат вычисления: {result}</p>
            </div>
            
            <div>
                <p>Активные пользователи ({activeUsers.length}):</p>
                <UserList users={activeUsers} onUserClick={handleUserClick} />
            </div>
        </div>
    );
};