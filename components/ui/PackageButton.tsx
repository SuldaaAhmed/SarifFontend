import React, { useState } from 'react';
import PackageForm from '../form/PackageForm';

interface PackageButtonProps {
  packageName: string;
  packageOptions: string[]; // Add packageOptions prop here
}

const PackageButton: React.FC<PackageButtonProps> = ({ packageName, packageOptions }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const openForm = () => setIsFormVisible(true);
  const closeForm = () => setIsFormVisible(false);

  return (
    <div>
      <button onClick={openForm} disabled={isFormVisible}>
        Get Started
      </button>

      {isFormVisible && (
        <PackageForm
          packageName={packageName}
          packageOptions={packageOptions}  // Pass the packageOptions prop here
          onClose={closeForm}
        />
      )}
    </div>
  );
};

export default PackageButton;
