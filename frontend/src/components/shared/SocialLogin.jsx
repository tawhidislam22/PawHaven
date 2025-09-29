import { FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Providers/AuthProvider';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { toast } from 'react-hot-toast';

const SocialLogin = ({ role = 'employee', redirectTo = '/dashboard', additionalData = {} }) => {
    const { googleSignIn } = useAuth();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const handleGoogleSignIn = async () => {
        try {
            const result = await googleSignIn();

            // Save user to database
            const userInfo = {
                name: result.user.displayName,
                email: result.user.email,
                role: role,
                dateOfBirth: null,
                ...additionalData
            };

            await axiosPublic.post('/users', userInfo);

            // Get JWT token
            await axiosPublic.post('/jwt', { email: result.user.email });

            toast.success('Successfully signed in with Google!');
            navigate(redirectTo);
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <button
            onClick={handleGoogleSignIn}
            className="w-full bg-white border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-medium transition-all duration-300 hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center"
            type="button"
        >
            <FaGoogle className="mr-3 text-red-500 text-lg" /> 
            Continue with Google
        </button>
    );
};

export default SocialLogin; 