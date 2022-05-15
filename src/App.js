import Header from './Component/Header';
import AddForm from './Component/AddForm';
import Pagination from './Component/Page/Pagination';
import Page from './Component/Page/Page';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Edit_page from './Component/Edit_page';


function App() {

  const [post, setpost] = useState([]);

  const [Titlepost, setTitlelepost] = useState();
  const [bodypost, setBodypost] = useState();
  const [Id, setId] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxpageNumberLimit, setmaxpageNumberLimit] = useState(5);
  const [minpageNumberLimit, setminpageNumberLimit] = useState(0);


  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setpost(res.data);

    };
    fetchPosts();
    // setCurrentPage();
  }, []);

  const onAdd = async (title, body) => {
    await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        body: body,
        userId: 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => setpost((privious) => {

        return [json, ...privious];
      }));
  };

  const onDelete = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.status !== 200) {
          return;
        } else {
          setpost(
            post.filter((user) => {
              return user.id !== id;
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onEdit = async (id, userId) => {


    const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
    setTitlelepost(res.data.title);
    setBodypost(res.data.body);
    setId(res.data.id);
    document.getElementById("update").style.display = "block";


  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = post.slice(indexOfFirstPost, indexOfLastPost);
  const paginateNumber = (number) => {
    setCurrentPage(number);
  }

  const handelNextBtn = () => {
    if (currentPage < Math.ceil(post.length / postsPerPage)) {
      setCurrentPage(currentPage + 1);
      if (currentPage + 1 > maxpageNumberLimit) {
        setmaxpageNumberLimit(maxpageNumberLimit + pageNumberLimit);
        setminpageNumberLimit(minpageNumberLimit + pageNumberLimit);
      }
    }
  }
  const handelPrevBtn = () => {
    if (currentPage > 1) {

      setCurrentPage(currentPage - 1);
      if ((currentPage - 1) % pageNumberLimit === 0) {
        setmaxpageNumberLimit(maxpageNumberLimit - pageNumberLimit);
        setminpageNumberLimit(minpageNumberLimit - pageNumberLimit);
      }
    }
  }


  const onUp = async (title, body, id) => {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        id: id,
        title: title,
        body: body,
        userId: 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => setpost(
        post.map((user) => {
          if (user.id !== id) {
            return user;
          } else {
            return json;
          }
        })
      )
      );
    document.getElementById("update").style.display = "none";
  };


  return (
    <>
      <div>
        <Edit_page
          Title={Titlepost}
          Body={bodypost}
          onUp={onUp}
          Id={Id}></Edit_page>
        <Header></Header>
        <AddForm
          onAdd={onAdd}
          TitleName={Titlepost}
          Bodypost={bodypost}

        >

        </AddForm>
        <Page
          pagedata={currentPosts}
          Del={onDelete}
          Edit={onEdit}>
        </Page>
        <div className='b'>
          <input
            type="button"
            className='next_prev_btn'
            onClick={handelPrevBtn}
            value="prev">
          </input>
          <Pagination
            totalPost={post.length}
            postsPerPage={postsPerPage}
            paginateNumber={paginateNumber}
            maxpageNumberLimit={maxpageNumberLimit}
            minpageNumberLimit={minpageNumberLimit}
          />
          <input type="button" className='next_prev_btn' onClick={handelNextBtn} value="next"></input>
        </div>
      </div>
    </>
  );
}

export default App;
