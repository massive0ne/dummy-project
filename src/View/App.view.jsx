import {
    Box,
    Typography,
    ThemeProvider,
    createTheme,
    TextField
} from "@mui/material";
import { Container } from "@mui/system";
import { CacheProvider } from '@emotion/react';
import { prefixer } from 'stylis';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import Transaction from "../Components/Transaction";
import CustomSelect from "../Components/CustomSelect";

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
                            "flexDirection": { md: "row", xs: "column" },
                            "flexWrap": "wrap",
                            "justifyContent": "space-between",
                            "alignItems": "center",
                            "paddingX": "2rem",
                            "marginBottom": "1rem",
                        }}>
                            <Typography variant="h5" sx={{
                                "margin": "0",
                                "marginBottom": { md: "0", xs: "1.25rem" },
                            }}>
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
                                <CustomSelect
                                    category={props.category}
                                    categories={props.categories}
                                    updateCategory={(value) => props.updateCategory(value)}
                                />
                            </Box>
                        </Box>
                        {/* data */}
                        <Box>
                            {props.data.map((item) =>
                                <Box key={item.faDate} sx={{
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
                                    <Box sx={{ "paddingX": "2rem", "paddingBottom": "1rem" }}>
                                        {item.transactions.map((transaction) =>
                                            <Transaction
                                                key={transaction.id}
                                                transaction={transaction}
                                            />
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