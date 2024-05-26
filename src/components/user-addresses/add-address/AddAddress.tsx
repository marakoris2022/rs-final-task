import { useNavigate } from 'react-router-dom';
import { Button } from '../../button/Button';

export const AddAddress = () => {
  const navigate = useNavigate();

  const handleBackToProfile = () => {
    navigate('/profile/addresses');
  };

  return (
    <div>
      TEST
      <Button style="sds" title="Back" type="button" onClick={handleBackToProfile} />
    </div>
  );
};
