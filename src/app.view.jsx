import {
    Box,
    Select,
    Typography,
    FormControl,
    MenuItem,
    InputLabel,
    ThemeProvider,
    createTheme,
    TextField
} from "@mui/material";
import { Container } from "@mui/system";
import { CacheProvider } from '@emotion/react';
import { prefixer } from 'stylis';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';

const AppView = (props) => {
    const cacheRtl = createCache({
        key: 'muirtl',
        stylisPlugins: [prefixer, rtlPlugin],
    });
    const theme = createTheme({
        direction: 'rtl',
    });

    return (
        <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
                <Container>
                    <Box sx={{
                        "width": "100%",
                        "display": "flex",
                        "flexDirection": "column",
                        "paddingY": "2rem",
                    }}>
                        {/* info & actions */}
                        <Box sx={{
                            "display": "flex",
                            "flexWrap": "wrap",
                            "justifyContent": "space-between",
                            "alignItems": "center",
                            "paddingX": "2rem",
                            "marginBottom": "1rem",
                        }}>
                            <Typography variant="h5" sx={{ "margin": "0" }}>
                                {props.category || 'تمام تراکنش ها'}
                            </Typography>
                            <Box sx={{
                                "display": "flex",
                                "flexWrap": "nowrap"
                            }}>
                                {props.category === "trip_financials" &&
                                    <TextField sx={{ "marginRight": "1.5rem" }}
                                        id="courier-input"
                                        label="نام کوریر"
                                        variant="outlined"
                                        onChange={(event) => props.updateCourierName(event.target.value)}
                                    />}
                                <Box sx={{
                                    "width": "15rem",
                                }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="category-select-label">نوع تراکنش</InputLabel>
                                        <Select
                                            labelId="category-select-label"
                                            id="category-select"
                                            value={props.category}
                                            label="نوع تراکنش"
                                            onChange={(event) => props.updateCategory(event.target.value)}
                                        >
                                            <MenuItem value={""}>همه تراکنش ها</MenuItem>
                                            {props.categories.map((category, categoryIndex) =>
                                                <MenuItem value={category}
                                                    key={categoryIndex}>{category}</MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Box>
                        </Box>
                        {/* data */}
                        <Box>
                            {props.data.map((item, itemIndex) =>
                                <Box key={itemIndex} sx={{
                                    "display": "flex",
                                    "flexDirection": "column"
                                }}>
                                    <Box
                                        sx={{
                                            "paddingX": "1rem",
                                            "background": "#ecedef",
                                            "height": "3rem",
                                            "display": "flex",
                                            "alignItems": "center"
                                        }}>
                                        <Typography
                                            sx={{ "direction": "rtl", "textAlign": "left" }}>
                                            {item.faDate}
                                        </Typography></Box>
                                    <Box sx={{ "paddingX": "2rem", "paddingBottom": "1rem"}}>
                                        {item.activities.map((activity, activityIndex) =>
                                            <Box key={activityIndex} sx={{
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
                                                            new Date(activity.epochTimestamp).toLocaleTimeString('fa-IR')
                                                            + " ," +
                                                            new Date(activity.epochTimestamp).toLocaleDateString('fa-IR')
                                                        }
                                                    </Typography>
                                                    <Typography color={
                                                        (activity.amount || activity.final_price) > 0 ? "#2acd51" : "#f94476"
                                                    }>{
                                                        activity.category === 'trip_financials' ? 'هزینه سفر' :
                                                            activity.category === 'concurrency_costs' ? 'خرید ظرفیت همزمان' :
                                                                activity.title ? activity.title :
                                                                (activity.amount || activity.final_price) > 0 ? 'شارژ حساب' : 'خسارت'
                                                    }</Typography>
                                                    {activity.category === "concurrency_costs" && <Typography>
                                                        {
                                                            "خرید ظرفیت, از تاریخ " +
                                                                new Date(activity.start_date).toLocaleDateString('fa-IR') +
                                                                ' تا تاریخ ' + new Date(activity.end_date).toLocaleDateString('fa-IR')
                                                        }
                                                    </Typography>}
                                                    {activity.driver && <Typography>
                                                        {
                                                            "کوریر: " + activity.driver 
                                                        }
                                                    </Typography>}
                                                    {activity.hub && <Typography>
                                                        {
                                                            "شعبه: " + activity.hub.title 
                                                        }
                                                    </Typography>}
                                                </Box>
                                                <Typography sx={{ "direction": "rtl", "letterSpacing": "0.0625rem" }}
                                                    color={
                                                        (activity.amount || activity.final_price) > 0 ? "#2acd51" : "#f94476"
                                                    }>{(activity.amount || activity.final_price).toString()
                                                        .replace(/\B(?=(\d{3})+(?!\d))/g, "/")}</Typography>
                                            </Box>
                                        )}
                                    </Box>
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </CacheProvider>
    );
}

export default AppView;