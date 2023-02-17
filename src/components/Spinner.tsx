import { ReactComponent as Loader } from './../icons/loader.svg';

export function Spinner() {
  return (
    <div className="loader">
      <div className="loader-icon">
        <Loader />
        <p>Loading...</p>
      </div>
    </div>
  )
}
