db.createUser({
    user: "ralphdev",
    pwd: "secret",
    roles: [
        {
            role: "dbAdmin",
            db: "shop"
        },
        {
            role: "userAdmin",
            db: "shop"
        },
        {
            role: "readWrite",
            db: "shop"
        },
        {
            role: "dbOwner",
            db: "shop"
        },
        {
            role: "enableSharding",
            db: "shop"
        },
        {
            role: "read",
            db: "shop"
        }
    ]
});