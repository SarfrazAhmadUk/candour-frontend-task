import { User } from '../types/User';

interface ICardProps {
  user: User;
};

export function Card({ user }: ICardProps): JSX.Element {
  return (
    <div className="card" key={user.id}>
      <div className="left-column">
        <div className="image-block">
          <img src={user.avatar} alt={user.first_name} />
        </div>
      </div>
      <div className="right-column">
        <div className="details">
          <h2>{user.first_name} {user.last_name}</h2>
          <a href={`mailto:${user.email}`}>{user.email}</a>
        </div>
      </div>
    </div>
  )
}
