





import { useState } from 'react';
import axios from 'axios';


interface AccountDataProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}
interface FormState {
  username: string;
  accountType: 'freelancer' | 'project_owner' | 'company';
  termsAgreed: boolean;
}


const AccountData: React.FC<AccountDataProps> = ({setCurrentStep}: any) => {
  const [form, setForm] = useState<FormState>({
    username: '',
    accountType: 'freelancer',
    termsAgreed: false,
  });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [error, setError] = useState({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  
  const validateForm = (): boolean => {
    const newErrors: Partial<FormState> = {};

    if (!form.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (form.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!form.termsAgreed) {
      newErrors.termsAgreed = true;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    
    if (validateForm()) {
      try {
        const basicUserInfo = JSON.parse(localStorage.getItem('basicUserInfo') || '{}');
        const {  username: userName, accountType } = form
        const fullData = { ...basicUserInfo, userName, accountType  };

        
        const response = await axios.post(`${process.env.REACT_APP_BACK_URL}/register`, fullData);

      
        
        localStorage.setItem('currentStep', '2');
        
        localStorage.setItem('token', response.data.token);
        localStorage.removeItem("basicUserInfo");
        setCurrentStep(2)

      } catch (err: any) {        
        if (err.response) {
          setError(err.response.data.message);
          console.error('Login failed:', err.response.data);          
          
        } else if (err.request) {
          console.error('Login failed: No response received', err.request);
          setError('No response received from the server.');
        } else {
          
          console.error('Login failed:', err.message);
          setError('An error occurred. Please try again later.');
        }
      }
    }
  };

const name = JSON.parse(localStorage.getItem('basicUserInfo') || '{}')
  
  return (
    <div className="py-20 mb-40  flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-20 rounded shadow-md w-full max-w-4xl">
        <h1 className="text-center py-2 text-2xl font-semibold text-gray-800 mb-4">{name.firstName} {name.lastName}</h1>

        {/* Username */}
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={form.username}
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.username ? 'border-red-500' : ''
            }`}
          />
          <h6 className="text-sm">It must be unique and composed of English letters and numbers only, with underscores (_) allowed between them. It cannot be changed later.</h6>
          {errors.username && <p className="text-red-500 text-xs italic">{errors.username}</p>}
        </div>

        {/* Account Type */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Account Type</label>
          <div className="space-y-2">
  {['freelancer', 'project_owner', 'company'].map((type) => (
    <div
      key={type}
      className={`flex flex-col border-2 rounded-md p-4 ${
        form.accountType === type ? 'border-blue-400 text-blue-500' : 'border-gray-300'
      }`}
    >
      <div className="flex items-center">
        <input
          type="radio"
          id={type}
          name="accountType"
          value={type}
          checked={form.accountType === type}
          onChange={handleChange}
          disabled={type === 'company'}
          className="mr-2 cursor-pointer disabled:cursor-not-allowed"
        />
        <label
          htmlFor={type}
          className={`font-medium ${
            form.accountType === type ? 'text-blue-500' : 'text-gray-700'
          } ${type === 'company' ? 'text-gray-400' : ''}`}
        >
          {type.replace('_', ' ')}
        </label>
      </div>
      <p className={`text-sm ${form.accountType === type ? 'text-blue-500' : 'text-gray-500'}`}>
        {type === 'freelancer'
          ? '(Services seller / Project implementer)'
          : type === 'project_owner'
          ? '(Project owner / Services buyer)'
          : '(Remote Hiring of Freelancers)'}
      </p>
    </div>
  ))}
</div>

        </div>

        {/* Terms Agreement */}
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="termsAgreed"
              checked={form.termsAgreed}
              onChange={handleChange}
              className="mr-2"
            />
            <span className="text-gray-700">
              I agree to the <a href="#" className="text-blue-500">terms of use</a> and{' '}
              <a href="#" className="text-blue-500">privacy policy</a>
            </span>
          </label>
          {errors.termsAgreed && <p className="text-red-500 text-xs italic">You must agree to the terms</p>}
        </div>

        { Object.keys(error).length != 0  && <div className="text-red-500">{error.toString()}</div>}
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-orange-500 text-white font-semibold py-2 px-4 rounded hover:bg-orange-600 transition-colors duration-300"
        >
          Complete Registration
        </button>
      </div>
    </div>
  );
};

export default AccountData;