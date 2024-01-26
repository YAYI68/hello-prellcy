export {};

interface User {
  userId: string;
}
declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}

//   declare global {
//     namespace NodeJS {
//         interface Global {
//             config:
//         }
//     }
// }
