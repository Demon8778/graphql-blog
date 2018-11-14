const Query = {
    users(parent, args, {
        db
    }, info) {
        if (!args.query) {
            return db.users;
        }
        return db.users.filter((user) => {
            return user.name.toLowerCase().includes(args.query.toLowerCase());
        });
    },
    posts(parent, args, {
        db
    }, info) {
        if (!args.query) {
            return db.posts;
        }
        return db.posts.filter((post) => {
            const titleMatch = post.title.toLowerCase().includes(args.query.toLowerCase());
            const bodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase());
            return titleMatch || bodyMatch;
        });
    },
    comments(parent, args, {
        db
    }, info) {
        return db.comments;
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
};

export default Query;
