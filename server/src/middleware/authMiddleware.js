export const isAuthenticated = (req, res, next) => {
    if(!req.user){
        return res.status(401).json({ errorMessage: 'Unauthorized. Please log in.' });
    }

    return next();
};

export const checkRole = (...allowedRoles) => {
    return (req, res, next) => {
        if(!req.user){
            return res.status(401).json({ errorMessage: 'Unauthorized. Please log in.' });
        }

        if(!allowedRoles.includes(req.user.role)){
            return res.status(403).json({
                success: false,
                error: 'User role unauthorized access.'
            })
        }

        return next();
    }
}