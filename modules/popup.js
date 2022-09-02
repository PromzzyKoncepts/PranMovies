import { Involvemnt } from './PopupApi'

export default class Popup {
  static getInfos = async (id) => {
    const movieInfo = await fetch(`https://api.tvmaze.com/shows/${id}`).then((result) => result.json());
    return movieInfo;
  }

  static display = async (movieInfo, id) => {
    const mi = await movieInfo;
    const popup = document.querySelector('.popup');
    popup.innerHTML = `  
     <div class="description">
        <div class="D-description">
          <img src="${mi.image.medium}" alt="">
          <div>
            <h1>${mi.name}</h1>
            ${mi.summary}
        </div>
        </div>
        <div class = "comments">
          <div class = "form" >
            <label for="fname">your Name:</label><br>
            <input type="text" id="fname" name="fname"><br>
            <label for="comment">Your Comment:</label><br>
            <textarea name="comment" id="comment" cols="20" rows="7">
            </textarea>
            <input id = ${id} class= "submit" type="submit" value="Submit">
          </div>
          <div>
            <h3> Your Comments</h3>
            <ul class ="D-comments">
            </ul>
          </div>
        </div>
      </div>
    <ul class = "mInfo">
     <h1>SHOW INFO</h1>
      <li><a href="${mi.network.officialSite}">${mi.network.name}</a> (${mi.premiered} - ${mi.ended})</li>
      <li><b>Schedule</b>: ${mi.schedule.days[0]} at ${mi.schedule.time} (${mi.runtime}min)</li>
      <li><b>Status</b>: ${mi.status}<</li>
      <li><b>Show Type:</b> ${mi.type}<</li>
      <li><b>Geners</b>: ${mi.genres}<</li>
      <li><b>Episodes Ordered</b> </li>
      <li><b>language:</b>: ${mi.language}</li>
      <li><b>Rating:</b>: ${mi.rating.average}</li>
    </ul>`;
  }

  static displayCom = async (MoveInfo) => {
    const commentList = document.querySelector('.D-comments');
    console.log(commentList);
    commentList.innerHTML = '';
    const arr = await MoveInfo;
    arr.forEach((item) => {
      commentList.innerHTML += `<li>${item.username}: ${item.comment} - ${item.creation_date}</li>`;
    });
  };
}