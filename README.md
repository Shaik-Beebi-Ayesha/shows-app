<h1>TV Show Information App</h1>
<br/>
<p>This is a simple React JS application that fetches TV show information from the TVMaze API and displays it in a user-friendly format. The app consists of two screens: one for displaying a list of TV shows and their details, and another for showing the summary of a selected show and allowing users to book tickets for it.</p>
<br/>
<h2>Features</h2>
<ul>
  <li>Fetches TV show data from the TVMaze API</li>
<li>Displays a list of TV shows with their names and details</li>
<li>Allows users to click on a show to view its summary and book tickets</li>
<li>Stores user details using local storage</li>
</ul>
<br/>
<h2>Technologies Used</h2>
<ul>
  <li>React JS</li>
  <li>Axios (for making API requests)</li>
  <li>React Router (for navigation)</li>
  <li>Bootstrap (for styling)</li>
</ul>
<br/>
<h2>Usage</h2>
<ul>
  <li>On the main screen, you will see a list of TV shows.</li>
  <li>Click on a show to view its summary and book tickets.</li>
  <li>Fill in the required details in the form and submit to book tickets.</li>
</ul>
<h2>Project Structure</h2>
<p>The project follows a typical React JS file structure:</p>
<pre>
  tv-show-app/
  ├── src/
  │   ├── components/
  │   │   ├── ShowList.js
  │   │   ├── ShowDetails.js
  │   │   ├── TicketBookingForm.js
  │   ├── App.js
  │   ├── index.js
  │   ├── ...
  ├── public/
  │   ├── index.html
  │   ├── ...
  ├── package.json
  ├── ...
</pre>
<br/>
<h2>API Usage</h2>
<p>The application uses the TVMaze API to fetch TV show data. The API endpoint used is:</p>
<pre>https://api.tvmaze.com/search/shows?q=all</pre>
<br/>
<h2>Contributing</h2>
<p>Contributions are welcome! If you find any issues or have suggestions for improvement, please open an issue or submit a pull request.</p>
<h2>Screenshots</h2>
<br/>
<h4>Main screen showing a list of TV shows</h4>
<br/>
<img src='https://drive.google.com/file/d/145VbCE8HzpGYv_N20GNbGAFX6RWIxkzY/view?usp=sharing'/>
<h4>Show details Screen</h4>
<h4>Ticket Booking form</h4>
