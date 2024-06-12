import { useCallback,useEffect,useState } from 'react';
import './App.css';
import IDeal from './utils/interfaces';
import TextField from '@mui/material/TextField';
import MyTable from './components/Table/Table';
import useDebounce from './hooks/useDebounce';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import { getDeals } from './utils/utils';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';

function App() 
{
  const [isLoad,setIsLoad] = useState(true);
  const [deals,setDeals] = useState<IDeal[]>([]);
  const [search,setSearch] = useState<string>("");

  const handleLoadData = useCallback(async (query?: string) =>
  {
    setIsLoad(true);
    const data = await getDeals(query);
    setDeals(data);
    setIsLoad(false);
  },[getDeals]);

  useEffect(() =>
  {
    handleLoadData();
  },[]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
  {
    if (!e.target || (e.target.value.length < 3 && e.target.value.length > 0))
      return;

    await handleLoadData(e.target.value === "" ? undefined : e.target.value);
    setSearch(e.target.value);
  };
  const ths = ["Название","Бюджет","Статус","Ответ-ый менеджер","Дата создания"];
  const debounced = useDebounce(handleChange,800);

  return (
    <>
      <main className='main_content'>
        <div className='content'>
          <div className='head'>
            <h2>Сделки</h2>
            {
              isLoad
                ?
                <CircularProgress color="secondary" />
                :
                <TextField
                  hiddenLabel
                  id="outlined-size-small"
                  placeholder='Поиск'
                  variant="outlined"
                  size="small"
                  color="secondary"
                  label="Поиск"
                  defaultValue={search}
                  onChange={(e) => debounced(e)}
                />
            }
          </div>
          <hr className='line' />
          <div className='body'>
            <div className='wrapper_table'>
              {
                isLoad
                  ?
                  <CircularProgress color="secondary" />
                  :

                  <>
                    <MyTable
                      data={deals}
                      ths={ths}
                    />
                    {
                      deals.length === 0
                      &&
                      <div className="data_empty">
                        <AnnouncementIcon />
                        <p>Данные пусты</p>
                      </div>
                    }
                  </>
              }
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
