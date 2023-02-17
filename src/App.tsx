import { useCallback, useEffect, useState } from 'react';
import './App.scss';
import { Card } from './components/Card';
import { Pagination } from './components/Pagination';
import { Spinner } from './components/Spinner';
import { BASE_URL, RECORDS_PER_PAGE } from './constants/constants';
import { IPagination } from './types/Pagination';
import { User } from './types/User';

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<IPagination>({
    page: 1,
    per_page: RECORDS_PER_PAGE,
    total: 0,
    total_pages: 0
  });
  const [users, setUsers] = useState<User[]>([]);

  const getData = useCallback(async (page: number) => {
    try {
      setIsLoading(true);
      const data = await (await fetch(`${BASE_URL}/users?page=${page}&per_page=${pagination.per_page}`)).json()
      setUsers(data.data)
      setPagination(p => ({
        ...p,
        page: data.page,
        per_page: data.per_page,
        total: data.total,
        total_pages: data.total_pages
      }))
    } catch (error) {
      setError("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }, [pagination.per_page]);

  useEffect(() => {
    getData(pagination.page);
  }, [getData, pagination.page])

  const handlePagination = useCallback((page: number) => {
    setPagination({
      ...pagination,
      page
    });
  }, [pagination]);

  const handlePrevious = useCallback(() => {
    if (pagination.page > 1) {
      setPagination({
        ...pagination,
        page: pagination.page - 1
      });
    }
  }, [pagination]);

  const handleNext = useCallback(() => {
    if (pagination.page < pagination.total_pages) {
      setPagination({
        ...pagination,
        page: pagination.page + 1
      });
    }
  }, [pagination]);

  return (
    <div className="main">
      <div className="container">
        {error && <p className="error">{error}</p>}
        {isLoading && <Spinner />}
        <div className="cards">
          {
            users.map(user => (
              <Card key={user.id} user={user} />
            ))
          }
        </div>
        {
          pagination.total_pages > 0 && (
            <Pagination
              pagination={pagination}
              handlePrevious={handlePrevious}
              handlePagination={handlePagination}
              handleNext={handleNext}
            />
          )
        }
      </div>
    </div>
  );
}

export default App;
