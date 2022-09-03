export default class Popup {
  static getInfos = async (id) => {
    const movieInfo = await fetch(`https://api.tvmaze.com/shows/${id}`).then((result) => result.json());
    return movieInfo;
  }

  static countComments = (len) => len.length

  static display = async (movieInfo, id, comList) => {
    const mi = await movieInfo;
    const arr = await comList;
    const popup = document.querySelector('.popup');
    popup.innerHTML = `  
      <div class="description">
        <div class="D-description">
          <img src="${mi.image.medium}" class = "image" alt="">

          <div class = "comments">
            <div class = "form" >
              <label for="fname">Name:</label><br>
              <input type="text" id="fname" name="fname" placeholder = "Enter your name"><br>
              <label for="comment">Comment:</label><br>
              <textarea name="comment" id="comment" cols="20" rows="4" placeholder = "Enter your comment"></textarea>
              <input id = ${id} class= "submit" type="submit" value="Submit">
            </div>
          </div>
        </div>

        <div class = "summary-tag">
          <h1>${mi.name}</h1>
          ${mi.summary}
        </div>

      </div>
      <ul class = "mInfo">
        <h1> TV SHOW INFO</h1>
        <li><a href="${mi.network.officialSite}">${mi.network.name}</a> (${mi.premiered} - ${mi.ended})</li>
        <li><b>Schedule</b>: ${mi.schedule.days[0]} at ${mi.schedule.time} (${mi.runtime}min)</li>
        <li><b>Status</b>: ${mi.status}</li>
        <li><b>Show Type:</b> ${mi.type}</li>
        <li><b>Genres</b>: ${mi.genres}</li>
        <li><b>Episodes Ordered</b> </li>
        <li><b>language:</b>: ${mi.language}</li>
        <li><b>Rating:</b>: ${mi.rating.average}</li>
        <div>
          <h3> All Comments (${this.countComments(arr)})</h3>
          <ul class ="D-comments">
          </ul>
        </div>
      </ul>`;
  }

  static displayCom = async (MoveInfo) => {
    const commentList = document.querySelector('.D-comments');
    commentList.innerHTML = '';
    const arr = await MoveInfo;
    arr.forEach((item) => {
      commentList.innerHTML += `<li>${item.username}: ${item.comment} - ${item.creation_date}</li>`;
    });
  };
}