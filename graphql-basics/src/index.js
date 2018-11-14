import { GraphQLServer } from 'graphql-yoga';
import uuidv4 from 'uuid/v4';
//Demo user data
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

let posts = [{
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

let comments = [{
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

//Resolvers
const resolvers = {
    Query: {
        users(parent, args, ctx, info) {
            if(!args.query) {
                return users;
            }
            return users.filter((user) => {
                return user.name.toLowerCase().includes(args.query.toLowerCase());
            });
        },
        posts(parent, args, ctx, info) {
            if(!args.query) {
                return posts;
            }
            return posts.filter((post) => {
                const titleMatch = post.title.toLowerCase().includes(args.query.toLowerCase());
                const bodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase());
                return titleMatch || bodyMatch;
            });
        },
        comments(parent, args, ctx, info) {
            return comments;
        },
        me(parent, args, ctx, info) {
            return {
                id: 'abc123',
                name: 'Kiur',
                email: 'fjksldjklj@gmail.com',
            };
        },
        post(parent, args, ctx, info) {
            return {
                id: 'post1',
                title: 'My first post',
                body: 'This is the body of my post',
                published: false
            };
        }
    },
    Mutation: {
        createUser(parent, args, ctx, info) {
            const emailTaken = users.some((user) => user.email === args.data.email);

            if(emailTaken) {
                throw new Error('Email already exists!');
            }

            const user = {
                id: uuidv4(),
                ...args.data
            };

            users.push(user);
            return user;
        },
        deleteUser(parent, args, ctx, info) {
            const userIndex = users.findIndex((user) => user.id === args.id);

            if(userIndex === -1) {
                throw new Error('User not found!');
            }

            const deletedUsers = users.splice(userIndex, 1);

            posts = posts.filter((post) => {
                const match = post.author === args.id;
                if(match) {
                    comments = comments.filter((comment) => comment.post !== post.id)
                }
                return !match;
            }) ;

            comments = comments.filter((comment) => comment.author !== args.id);

            return deletedUsers[0];
        },
        createPost(parent, args, ctx, info) {
            const userExists = users.some((user) => user.id === args.data.author);

            if(!userExists) {
                throw new Error('User not found!');
            };

            const post = {
                id: uuidv4(),
                ...args.data
            };

            posts.push(post);
            return post;
        },
        deletePost(parent, args, ctx, info) {
            const postIndex = posts.findIndex((post) => post.id === args.id);
            
            if(postIndex === -1) {
                throw new Error('Post not found!');
            }
            const deletedPosts = posts.splice(postIndex, 1);

            comments = comments.filter((comment) => comment.post !== args.id);

            return deletedPosts[0];
        },
        createComment(parent, args, ctx, info) {
            const userExists = users.some((user) => user.id === args.data.author);
            const postExists = posts.some((post) => post.id === args.data.post && post.published);

            if(!userExists || !postExists) {
                throw new Error('Unable to find user and post');
            }

            const comment = {
                id: uuidv4(),
                ...args.data
            };

            comments.push(comment);
            return comment;
        },
        deleteComment(parent, args, ctx, info) {
            const commentIndex = comments.findIndex((comment) => comment.id === args.id);

            if(commentIndex === -1) {
                throw new Error('Comment not found');
            }

            const deletedComments = comments.splice(commentIndex, 1);
            return deletedComments[0];
        }
    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author;
            });
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => {
                return comment.post === parent.id;
            });
        }
    },

    User: {
        posts(parent, args, ctx, info) {
            return posts.filter((post) => {
                return post.author === parent.id;
            });
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => {
                return comment.author === parent.id;
            });
        }
    },

    Comment: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author;
            });
        },
        post(parent, args, ctx, info) {
            return posts.find((post) => {
                return post.id === parent.post
            });
        }
    }
};

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers
});

server.start(() => {
    console.log('The server is up!')
});
