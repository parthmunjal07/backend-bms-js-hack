import pool from "../../common/config/db.js";
import ApiResponse from "../../common/utils/apiResponse.js";

// Get all seats
export const getSeats = async (req, res, next) => {
    try {
        const result = await pool.query("SELECT * FROM seats");
        return ApiResponse.ok(res, "Seats fetched", result.rows);
    } catch (err) {
        next(err);
    }
};

// Book a seat (Requires Auth)
export const bookSeat = async (req, res, next) => {
    try {
        const id = req.params.id;
        // Instead of getting name from URL, we get it from the logged-in user!
        const userName = req.user.name || req.user.email; 

        const conn = await pool.connect(); 
        
        try {
            await conn.query("BEGIN");
            
            const sql = "SELECT * FROM seats WHERE id = $1 AND isbooked = 0 FOR UPDATE";
            const result = await conn.query(sql, [id]);

            if (result.rowCount === 0) {
                // Release connection and return error
                conn.release();
                return res.status(400).json({ error: "Seat already booked or does not exist" });
            }
            
            const sqlU = "UPDATE seats SET isbooked = 1, name = $2 WHERE id = $1";
            const updateResult = await conn.query(sqlU, [id, userName]);

            await conn.query("COMMIT");
            conn.release(); 

            return ApiResponse.ok(res, "Seat booked successfully", updateResult.rows);
        } catch (transactionError) {
            await conn.query("ROLLBACK"); // Rollback if transaction fails
            conn.release();
            throw transactionError;
        }
    } catch (err) {
        next(err);
    }
};