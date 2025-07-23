const User = require('../models/user.model');

exports.getAllUsers = async (req, res) => {
    try {
        const id = req.id;

        const user = await User.findById(id);
        if (!user || user.role !== 'admin') {   
            return res.status(403).json({
                success: false,
                message: "Access denied"
            });
        }
        const { role } = req.query; 

        let query = {};
        if (role) { 
            query.role = role;
        }
        const users = await User.find(query).select("-password");

        res.status(200).json({
            success: true,
            users
        });

    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const userId = req.id;
        const user = await User.findById(userId);
        if (!user || user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: "Access denied"
            });
        }


        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ 
                success: false,
                error: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'User deleted successfully',
            user: deletedUser
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
