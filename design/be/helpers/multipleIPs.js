// Connect to the database
use your_database_name;  // Replace 'your_database_name' with your actual database name

// Run the aggregation for IpMacs collection
db.IpMacs.aggregate([
  { $unwind: "$ips" },  // Step 1: Unwind the ips array
  {
    $group: {            // Step 2: Group by ips
      _id: "$ips",       // Group by IP
      uniqueMacs: { $addToSet: "$mac" }  // Step 3: Accumulate unique MAC addresses
    }
  },
  {
    $match: {            // Step 4: Filter IPs with more than one unique MAC
      "uniqueMacs.1": { $exists: true }  // Checks if there is more than one element in the array
    }
  }
]).pretty();  // Optional: pretty-print the result

// Run the aggregation for IpMacHistories collection
db.IpMacHistories.aggregate([
  { $unwind: "$ips" },  // Step 1: Unwind the ips array
  {
    $group: {            // Step 2: Group by ips
      _id: "$ips",       // Group by IP
      uniqueMacs: { $addToSet: "$mac" }  // Step 3: Accumulate unique MAC addresses
    }
  },
  {
    $match: {            // Step 4: Filter IPs with more than one unique MAC
      "uniqueMacs.1": { $exists: true }  // Checks if there is more than one element in the array
    }
  }
]).pretty();  // Optional: pretty-print the result
