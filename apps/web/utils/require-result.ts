// function assertHasResult<T>( result: T | null | undefined ): asserts result is T {
//   if ( !result ) {
//     throw new Error( "No result found" );
//   }
// }

// /**
//  * Utility function to execute a query and validate its result.
//  */
// export const requireResult = async <T>( query: Promise<T | null | undefined> ): Promise<T> => {
//   const result = await query;
//   assertHasResult( result );
//   return result;
// };
