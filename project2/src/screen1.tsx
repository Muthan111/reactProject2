type Props = {
  onSubmit: () => void;
  onBack: () => void;
};

const Screen1 = ({ onSubmit, onBack }: Props) => {
  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <div>
      <h2>Screen 1</h2>
      <p>When you're ready, submit to continue.</p>
      <div style={{ display: "flex", gap: "0.75rem" }}>
        <button type="button" onClick={onBack}>
          Back
        </button>
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Screen1;
