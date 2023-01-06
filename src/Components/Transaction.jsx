import { Box, Typography } from "@mui/material";

const Transaction = ({ transaction }) => {
    return (
        <Box sx={{
            "display": "flex",
            "justifyContent": "space-between",
            "paddingY": "1rem",
            "borderBottom": "1px solid #ecedef",
            "&:last-child": {
                "borderBottom": "none",
                "paddingBottom": "0",
            }
        }}>
            <Box>
                <Typography>
                    {
                        new Date(transaction.epochTimestamp).toLocaleTimeString('fa-IR')
                        + " ," +
                        new Date(transaction.epochTimestamp).toLocaleDateString('fa-IR')
                    }
                </Typography>
                <Typography color={
                    (transaction.amount || transaction.final_price) > 0 ? "#2acd51" : "#f94476"
                }>{
                        transaction.category === 'trip_financials' ? 'هزینه سفر' :
                            transaction.category === 'concurrency_costs' ? 'خرید ظرفیت همزمان' :
                                transaction.title ? transaction.title :
                                    (transaction.amount || transaction.final_price) > 0 ? 'شارژ حساب' : 'خسارت'
                    }</Typography>
                {transaction.category === "concurrency_costs" && <Typography>
                    {
                        "خرید ظرفیت, از تاریخ " +
                        new Date(transaction.start_date).toLocaleDateString('fa-IR') +
                        ' تا تاریخ ' + new Date(transaction.end_date).toLocaleDateString('fa-IR')
                    }
                </Typography>}
                {transaction.driver && <Typography>
                    {
                        "کوریر: " + transaction.driver
                    }
                </Typography>}
                {transaction.hub && <Typography>
                    {
                        "شعبه: " + transaction.hub.title
                    }
                </Typography>}
            </Box>
            <Typography sx={{ "direction": "rtl", "letterSpacing": "0.0625rem" }}
                color={
                    (transaction.amount || transaction.final_price) > 0 ? "#2acd51" : "#f94476"
                }>{(transaction.amount || transaction.final_price).toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, "/")}</Typography>
        </Box>
    )
}

export default Transaction;