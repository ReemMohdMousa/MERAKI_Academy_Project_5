import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router-dom";
import axios from "axios";

const Search = () => {
  const [searchResult, setSearchResult] = useState("");

  const { user } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/search?firstName=${user}`)
      .then((result) => {
        setSearchResult(result.data.result);
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  return (
    <div>
      {searchResult &&
        searchResult.map((element, i) => {
          return (
            <Card
              style={{ width: "40rem", marginLeft: "4rem", marginTop: "2rem" }}
            >
              <div className="friend-list">
                <div className="friend-img-name">
                  <img
                    className="friend-img"
                    src={
                      element.avatar ||
                      "https://png.pngtree.com/png-clipart/20210613/original/pngtree-gray-silhouette-avatar-png-image_6404679.jpg"
                    }
                  />

                  <h6>{element.firstname + " " + element.lastname}</h6>
                </div>
              </div>
            </Card>
          );
        })}
    </div>
  );
};

export default Search;
