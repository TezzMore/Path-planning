


<h3>**Path Planning with Dijkstra's Algorithm**</h3>
This is a code snippet that demonstrates the implementation of Dijkstra's algorithm for path planning. The code reads data from an Excel file containing waypoint collections and calculates the shortest paths between each set of coordinates using Dijkstra's algorithm.

**Prerequisites**
To run this code, you need to have the following:

Node.js installed on your system.
The xlsx module installed. You can install it by running the following command:
Copy code:
"npm install xlsx"


**Usage**
Download or clone the code repository.
Install the required dependencies using the command mentioned in the prerequisites.
Replace the file path in the code ./data/Waypoints_collections.xlsx with the path to your own Excel file containing the waypoint collections.
Run the code using the command:
php
Copy code
"node <filename>.js"
Replace <filename>.js with the name of the file containing the code.
The code will output an array shortestPaths containing the shortest distances between each pair of coordinates.


**How the Code Works**
The code reads the Excel file using the xlsx module and extracts the data from the first sheet.
The extracted data is processed to create an array collections containing sets of coordinates.
The dijkstra function implements Dijkstra's algorithm to find the shortest paths in a graph.
For each collection of coordinates in collections, the code creates a graph and applies Dijkstra's algorithm to find the shortest distances between all pairs of coordinates.
The resulting shortest distances are stored in the shortestPaths array.
Finally, the shortestPaths array is printed to the console.



**Modifying the Code**
To use a different Excel file, update the file path in the code: const workbook = XLSX.readFile('./data/Waypoints_collections.xlsx');
Adjust the number of collections or the size of each collection by modifying the loops in the code: for (let i = 0; i < 8; i++) and for (let i = 2; i < jsonData.length; i++).
You can customize or extend the code to perform additional operations or utilize the calculated shortest paths as per your requirements.
Feel free to modify and experiment with the code to suit your needs.

Please let me know if you need any further assistance!
