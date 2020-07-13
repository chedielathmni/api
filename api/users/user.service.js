const pool = require("../../config/database");

// Create user
function create(data, callBack) {
  // Insert user query
  const query = `insert into transporter(first_name, last_name, password, phone_number, valid) 
  values(?,?,?,?,?)`;

  // Query values
  const values = [
    data.firstName,
    data.lastName,
    data.password,
    data.phoneNumber,
    false
  ];

  pool.query(query, values, (error, results) => {
    if (error) {
      callBack(error);
    }
    return callBack(null, results);
  }
  );
}

// Get user by phone number
function getUserByPhoneNumber(phoneNumber, callBack) {
  // Select by phone number query
  const query = `select * from transporter where phone_number = ?`;

  pool.query(query, [phoneNumber], (error, results) => {
    if (error) {
      callBack(error);
    }
    return callBack(null, results[0]);
  }
  );
}

// Get user by ID
function getUserByUserId(id, callBack) {
  // Select by ID query
  const query = `select * from transporter where id = ?`

  pool.query(query, [id], (error, results) => {
    if (error) {
      callBack(error);
    }
    return callBack(null, results[0]);
  }
  );
}

// Fetch all users
function getUsers(callBack) {
  // Select all users query
  const query = `select id, first_name, last_name, phone_number from transporter`;
  pool.query(query, [], (error, results) => {
    if (error) {
      callBack(error);
    }
    return callBack(null, results);
  }
  );
}

function updatePassword(driverId, password, callback) {
  const query = `update transporter set password = '${password}' where id = ${driverId}`;

  pool.query(query, [], (error, results) => {
    if (error) {
      callback(error);
    }
    return callback(null, results);
  })
}

module.exports = { create, getUserByPhoneNumber, getUserByUserId, getUsers, updatePassword };

// module.exports = {
//   create: (data, callBack) => {
//     pool.query(
//       `insert into transporter(first_name, last_name, password, phone_number) 
//                   values(?,?,?,?)`,
//       [
//         data.firstName,
//         data.lastName,
//         data.password,
//         data.phoneNumber
//       ],
//       (error, results, fields) => {
//         if (error) {
//           callBack(error);
//         }
//         return callBack(null, results);
//       }
//     );
//   },
//   getUserByPhoneNumber: (phoneNumber, callBack) => {
//     pool.query(
//       `select * from transporter where phone_number = ?`,
//       [phoneNumber],
//       (error, results, fields) => {
//         if (error) {
//           callBack(error);
//         }
//         return callBack(null, results[0]);
//       }
//     );
//   },
//   getUserByUserId: (id, callBack) => {
//     pool.query(
//       `select * from transporter where id = ?`,
//       [id],
//       (error, results, fields) => {
//         if (error) {
//           callBack(error);
//         }
//         return callBack(null, results[0]);
//       }
//     );
//   },
//   getUsers: callBack => {
//     pool.query(
//       `select id, first_name, last_name, phone_number from transporter`,
//       [],
//       (error, results, fields) => {
//         if (error) {
//           callBack(error);
//         }
//         return callBack(null, results);
//       }
//     );
//   },
/*   updateUser: (data, callBack) => {
    pool.query(
      `update registration set firstName=?, lastName=?, gender=?, email=?, password=?, number=? where id = ?`,
      [
        data.first_name,
        data.last_name,
        data.gender,
        data.email,
        data.password,
        data.number,
        data.id
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  deleteUser: (data, callBack) => {
    pool.query(
      `delete from registration where id = ?`,
      [data.id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  } */
// };
