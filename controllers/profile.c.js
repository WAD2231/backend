const Profile = require('../models/profile.m');
const defaultAvatar = 'https://th.bing.com/th/id/OIP.P8F796BGNue4Lu2SImT1bgAAAA?rs=1&pid=ImgDetMain';

module.exports = {
    getProfiles: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const size = parseInt(req.query.size) || 10;
            const profiles = await Profile.getProfiles(page, size);

            res.status(200).json(profiles);
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    
    getProfile: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const profile = await Profile.getProfile('profile_id', id);

            if (!profile) {
                res.status(404).json({ error: `Profile with id ${id} not found` });
                return;
            }

            res.status(200).json(profile);
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    createProfile: async (req, res) => {
        try {
            const profile = req.body;
            profile.user_id = req.user.user_id;
            profile.avatar = req.file 
                ? `${process.env.SERVER_URL}/uploads/users/${req.file.filename}` 
                : defaultAvatar;
            const existedProfile = await Profile.getProfile('u.user_id', profile.user_id);

            if (existedProfile) {
                return res.status(409).json({ error: 'Profile already exists' });
            }

            const newProfile = await Profile.createProfile(profile);
            res.status(201).json(newProfile);
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    updateProfile: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const profile = req.body;
            if (req.file) {
                profile.avatar = `${process.env.SERVER_URL}/uploads/users/${req.file.filename}`;
            }
            const existedProfile = await Profile.getProfile('profile_id', id);

            if (!existedProfile) {
                res.status(404).json({ error: `Profile with id ${id} not found` });
                return;
            }

            await Profile.updateProfile(id, profile);
            res.status(200).json({ message: 'Profile updated successfully' });
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    deleteProfile: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const existedProfile = await Profile.getProfile('profile_id', id);

            if (!existedProfile) {
                res.status(404).json({ error: `Profile with id ${id} not found` });
                return;
            }

            await Profile.deleteProfile(id);
            res.status(200).json({ message: 'Profile deleted successfully' });
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};