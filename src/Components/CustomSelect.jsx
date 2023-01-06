import { Box, Select, MenuItem, InputLabel, FormControl } from "@mui/material";

const CustomSelect = ({ category, categories, updateCategory }) => {
    return (
        <Box sx={{
            "minWidth": {xs: "12rem"},
            "width": {md: "15rem", xs: "unset"},
        }}>
            <FormControl fullWidth>
                <InputLabel id="category-select-label">نوع تراکنش</InputLabel>
                <Select
                    labelId="category-select-label"
                    id="category-select"
                    value={category}
                    label="نوع تراکنش"
                    onChange={(event) => updateCategory(event.target.value)}
                >
                    <MenuItem value={""}>همه تراکنش ها</MenuItem>
                    {categories.map((category, categoryIndex) =>
                        <MenuItem value={category}
                            key={categoryIndex}>{category}</MenuItem>
                    )}
                </Select>
            </FormControl>
        </Box>
    );
}

export default CustomSelect;