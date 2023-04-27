import React, {useEffect, useState} from 'react';

const PlyTable = ({songs, tk}) => {

    //
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
    // Wrap the loop in an async function to use async/await
    const fetchTracks = async () => {
        // Use Promise.all() with Array.map() to fetch track data for each song
        //console.log(res.songs)
        let list = [];

        await Promise.all(songs.map(async (id) => {
            const plyListURL = 'https://api.spotify.com/v1/tracks/' + id;
            const resultSongs = await fetch(plyListURL, {
                method: 'GET',
                headers: {'Authorization': 'Bearer ' + tk}
            })
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    list.push(res)
                });
        }));
        setTracks(list);

        // At this point, all track data should be fetched and pushed into the tracks array
        console.log(tracks);

    }

    fetchTracks();
    }, []);

    return (
        <div className="table-wrapper">
            <table id="pyTable">
                <thead>
                <tr>
                    <th id="tHeadI">Artist</th>
                    <th id="tHeadI">Song Name</th>
                    <th id="tHeadI">Album</th>
                </tr>
                </thead>
                <tbody>

                {

                    tracks.length > 0 ? tracks.map((res) => {

                        console.log("Hey")
                        console.log(res)

                        let audioUrl = res.preview_url;

                        let artName = res.artists[0].name

                        // console.log(artName)

                        return (
                            <tr>
                                <td id="tItems">{artName}</td>
                                <td id="tItems">{res.name}</td>
                                <td id="tItems">{res.album.name}</td>
                            </tr>
                        )
                    }) : ""
                }

                </tbody>
            </table>
        </div>
    )

}

export default PlyTable;
