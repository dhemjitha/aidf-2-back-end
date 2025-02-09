import User from "../infrastructure/schemas/User.js";

const createUser = async (req, res) => {
    const user = req.body;

    if (!user.name || !user.email) {
        res.status(400).send();
        return;
    }

    await User.create({
        name: user.name,
        email: user.email
    });

    res.status(201).send();
    return;
}

export default createUser;