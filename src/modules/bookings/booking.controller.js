import pool from "../../common/db/db.js";
import ApiResponse from "../../common/utils/apiResponse.js";

export const getSeats = async (req, res, next) => {
    try {
        const movieId = req.query.movieId || 1; 
        
        const result = await pool.query("SELECT * FROM seats WHERE movie_id = $1", [movieId]);
        
        return ApiResponse.ok(res, "Seats fetched", result.rows);
    } catch (err) {
        next(err);
    }
};

export const bookSeat = async (req, res, next) => {
    try {
        const id = req.params.id;
        const movieId = req.body.movieId;
        const userName = req.user.name || req.user.email; 

        const conn = await pool.connect(); 
        
        try {
            await conn.query("BEGIN");
            
            const sql = "SELECT * FROM seats WHERE id = $1 AND movie_id = $2 AND isbooked = 0 FOR UPDATE";
            const result = await conn.query(sql, [id, movieId]);

            if (result.rowCount === 0) {
                conn.release();
                return res.status(400).json({ error: "Seat already booked or does not exist" });
            }
            
            const sqlU = "UPDATE seats SET isbooked = 1, name = $3 WHERE id = $1 AND movie_id = $2";
            const updateResult = await conn.query(sqlU, [id, movieId, userName]);

            await conn.query("COMMIT");
            conn.release(); 

            return ApiResponse.ok(res, "Seat booked successfully", updateResult.rows);
        } catch (transactionError) {
            await conn.query("ROLLBACK"); 
            conn.release();
            throw transactionError;
        }
    } catch (err) {
        next(err);
    }
};