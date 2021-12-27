function GoBackButton({ handleGoBackButtonClick, label }) {
  const onClick = () => {
    handleGoBackButtonClick();
  };

  return (
    <button type="button" onClick={onClick}>
      {label}
    </button>
  );
}

export default GoBackButton;
