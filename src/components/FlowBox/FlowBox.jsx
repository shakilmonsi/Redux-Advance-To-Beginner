const FlowBox = ({ label, onClick, color }) => (
  <div
    className={`p-4 border rounded-lg cursor-pointer bg-${color}-200`}
    onClick={onClick}
  >
    {label}
  </div>
);

export default FlowBox;
