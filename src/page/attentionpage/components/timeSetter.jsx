function TimeSetter() {
  const [focusTime, setFocusTime] = useState(30);
  const handleSetTime = () => {
    const newTime = Number(inputValue);
    if (!isNaN(newTime) && newTime > 0) {
      setFocusTime(newTime);
    }
  };
  const [inputValue, setInputValue] = useState(30);
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  return (
    <div className="wrapper">
      <input
        type="number"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="초 단위로 입력"
      />
      <button onClick={handleSetTime}> 시간 설정 </button>
    </div>
  );
}

export default TimeSetter;
