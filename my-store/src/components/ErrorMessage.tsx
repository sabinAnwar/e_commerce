import { Link } from "react-router-dom";

type ErrorMessageProps = {
  message: string;
  backTo?: string;
  backLabel?: string;
};

function ErrorMessage({
  message,
  backTo = "/",
  backLabel = "Back to shop",
}: ErrorMessageProps) {
  return (
    <main className="status-page">
      <div className="error-card">
        <svg
          className="error-icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m0 3.75h.008v.008H12v-.008zM10.34 3.94l-7.5 13A1.75 1.75 0 004.34 19.5h15.32a1.75 1.75 0 001.5-2.56l-7.5-13a1.75 1.75 0 00-3 0z"
          />
        </svg>
        <h2>Something went wrong</h2>
        <p>{message}</p>
        <Link to={backTo} className="btn btn-primary">
          {backLabel}
        </Link>
      </div>
    </main>
  );
}

export default ErrorMessage;
