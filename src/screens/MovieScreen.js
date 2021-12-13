import React, { Component } from "react";
import "../App.css";

export default class MovieScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieData: [],
      searchData: [],
      pageCount: 0,
      currentPage: 1,
    };
  }

  componentDidMount() {
    this.getMovies();
  }
  getMovies() {
    this.setState({ movieData: [] });
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=cacd391c5cef64700a93b47200a411b3&language=en-US`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((parsedData) => {
        this.setState({
          movieData: parsedData.results,
        });
      });
  }

  search(text) {
    if (text === "") {
      this.getMovies();
    } else {
      this.setState({
        movieData: this.state.movieData.filter(
          (item) => item.title.toLowerCase().indexOf(text.toLowerCase()) > -1
        ),
      });
    }
  }

  orderItems(e) {
    let orderedData = [];
    console.log(e);
    switch (e) {
      case "name":
        orderedData = this.state.movieData.sort((a, b) =>
          a.title > b.title ? 1 : -1
        );
        this.setState({ movieData: orderedData });
        break;
      case "scoreAsc":
        orderedData = this.state.movieData.sort((a, b) =>
          a.popularity > b.popularity ? 1 : -1
        );
        this.setState({ movieData: orderedData });
        break;
      case "scoreDesc":
        orderedData = this.state.movieData.sort((a, b) =>
          a.popularity < b.popularity ? 1 : -1
        );
        this.setState({ movieData: orderedData });
        break;
    }
  }
  renderMovie() {
    return this.state.movieData.length > 0 ? (
      this.state.movieData.map((movie, i) => {
        return (
          <div key={i} className="card">
            <div className="cardbox">
              <div className="popularitybox">
                <p className="popularitytext">{Math.floor(movie.popularity)}</p>
              </div>
              <img
                alt={movie.title}
                className="cardimg"
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              />
            </div>
            <div className="cardtitle">
              <span>{movie.title}</span>
            </div>
            <div></div>
          </div>
        );
      })
    ) : (
      <div className="noitem">
        <p>Gösterilecek Film Yok</p>
      </div>
    );
  }

  pagination() {
    let pages = [];
    for (let i = 0; i < this.state.movieData.length / 7; i++) {
      pages.push(i + 1);
    }

    return pages.map((d) => {
      return <p style={{marginRight: 8}} >{d}</p>;
    });
  }
  render() {
    return (
      <div className="maincontainer">
        <div className="subheader">
          <div className="searchbar">
            <input
              type={"search"}
              placeholder="Film Ara..."
              onChange={(e) => {
                this.search(e.target.value);
              }}
            />
          </div>
          <div className="order">
            <select
              defaultValue={"default"}
              onChange={(e) => {
                this.orderItems(e.target.value);
              }}
            >
              <option value={"default"} hidden>
                Sırala
              </option>
              <option value={"name"}>İsme Göre Sırala</option>
              <option value={"scoreDesc"}>Puana Göre En Yüksek</option>
              <option value={"scoreAsc"}>Puana Göre En Düşük</option>
            </select>
          </div>
        </div>
        <div className="moviecontainer">{this.renderMovie()}</div>

        <div className="pagination">{this.pagination()}</div>
      </div>
    );
  }
}

// import React, { Component } from "react";
// import "../App.css";

// export default class MovieScreen extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       movieData: [],
//       searchData: [],
//     };
//   }

//   componentDidMount() {
//     this.getMovies();
//   }
//   getMovies() {
//     this.setState({ movieData: [] });
//     fetch(
//       `https://api.themoviedb.org/3/movie/popular?api_key=cacd391c5cef64700a93b47200a411b3&language=en-US`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     )
//       .then((res) => res.json())
//       .then((parsedData) => {
//         this.setState({
//           movieData: parsedData.results,
//         });
//       });
//   }

//   search(text) {
//     if (text === "") {
//       this.getMovies();
//     } else {
//       this.setState({
//         movieData: this.state.movieData.filter(
//           (item) => item.title.toLowerCase().indexOf(text.toLowerCase()) > -1
//         ),
//       });
//     }
//   }

//   orderItems(e) {
//     let orderedData = [];
//     console.log(e);
//     switch (e) {
//       case "name":
//         orderedData = this.state.movieData.sort((a, b) =>
//           a.title > b.title ? 1 : -1
//         );
//         this.setState({ movieData: orderedData });
//         break;
//       case "scoreAsc":
//         orderedData = this.state.movieData.sort((a, b) =>
//           a.popularity > b.popularity ? 1 : -1
//         );
//         this.setState({ movieData: orderedData });
//         break;
//       case "scoreDesc":
//         orderedData = this.state.movieData.sort((a, b) =>
//           a.popularity < b.popularity ? 1 : -1
//         );
//         this.setState({ movieData: orderedData });
//         break;
//     }
//   }
//   render() {
//     return (
//       <div className="maincontainer">
//         <div className="subheader">
//           <div className="searchbar">
//             <input
//               type={"search"}
//               placeholder="Film Ara..."
//               onChange={(e) => {
//                 this.search(e.target.value);
//               }}
//             />
//           </div>
//           <div className="order">
//             <select
//             defaultValue={"default"}
//               onChange={(e) => {
//                 this.orderItems(e.target.value);
//               }}
//             >
//               <option value={"default"} hidden>
//                 Sırala
//               </option>
//               <option  value={"name"}>İsme Göre Sırala</option>
//               <option value={"scoreDesc"}>Puana Göre En Yüksek</option>
//               <option value={"scoreAsc"}>Puana Göre En Düşük</option>
//             </select>
//           </div>
//         </div>
//         <div className="moviecontainer">
//           {this.state.movieData.length > 0 ? (
//             this.state.movieData.map((movie, i) => {
//               return (
//                 <div key={i} className="card">
//                   <div className="cardbox">
//                     <div className="popularitybox">
//                       <p className="popularitytext">
//                         {Math.floor(movie.popularity)}
//                       </p>
//                     </div>
//                     <img
//                       alt={movie.title}
//                       className="cardimg"
//                       src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
//                     />
//                   </div>
//                   <div className="cardtitle">
//                     <span>{movie.title}</span>
//                   </div>
//                   <div></div>
//                 </div>
//               );
//             })
//           ) : (
//             <div className="noitem">
//               <p>Gösterilecek Film Yok</p>
//             </div>
//           )}
//         </div>
//         <div className="pagination">pagination</div>
//       </div>
//     );
//   }
// }
