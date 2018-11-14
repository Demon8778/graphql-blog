const users = [{
    id: '1',
    name: 'Kiran',
    email: 'dontcare@gmail.com',
    age: 22
}, {
    id: '2',
    name: 'Sara',
    email: 'sara@gmail.com',
    age: 22
}, {
    id: '3',
    name: 'Mike',
    email: 'mike@gmail.com'
}];

const posts = [{
    id: '10',
    title: 'GrpahQL 101',
    body: 'This is how to use graphQL...',
    published: true,
    author: '1'
}, {
    id: '11',
    title: 'GrpahQL 102',
    body: 'This is how to use advanced graphQL...',
    published: true,
    author: '1'
}, {
    id: '12',
    title: 'GrpahQL 103',
    body: 'This is how to use programming in graphQL...',
    published: true,
    author: '2'
}];

const comments = [{
    id: '101',
    text: 'This is my first comment',
    author: '3',
    post: '10'
}, {
    id: '102',
    text: 'This is my second comment',
    author: '1',
    post: '10'
}, {
    id: '103',
    text: 'This is my third comment',
    author: '2',
    post: '11'
}, {
    id: '104',
    text: 'This is my fourth comment',
    author: '1',
    post: '12'
}];

const db = {
    users,
    posts,
    comments
};

export default db;
