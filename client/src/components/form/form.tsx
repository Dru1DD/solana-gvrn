import { ChangeEvent, FormEvent, useState } from 'react';
import Input from '@/components/input';
import Button from '@/components/button';

const Form = () => {
  const [formData, setFormData] = useState({
    slot: 0,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="number"
        label={'Slot number'}
        placeholder="Enter your name"
        value={formData.slot}
        onChange={handleChange}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default Form;
