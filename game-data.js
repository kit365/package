// Dữ liệu game - Timeline Triết Học Mác
const gameData = {
    correctSets: [
        {
            id: 1,
            time: "1844",
            author: "Karl Marx",
            work: "Luận cương về Feuerbach"
        },
        {
            id: 2,
            time: "1848",
            author: "Karl Marx & Friedrich Engels",
            work: "Tuyên ngôn của Đảng Cộng sản"
        },
        {
            id: 3,
            time: "1850s-1860s",
            author: "Karl Marx",
            work: "Phát triển lý luận kinh tế và triết học"
        },
        {
            id: 4,
            time: "1867",
            author: "Karl Marx",
            work: "Tư bản tập 1"
        },
        {
            id: 5,
            time: "1870s-1880s",
            author: "Karl Marx & Friedrich Engels",
            work: "Hoàn thiện và phổ biến tư tưởng"
        },
        {
            id: 6,
            time: "1884-1875",
            author: "Karl Marx",
            work: "Phê phán Cương lĩnh Gotha"
        },
        {
            id: 7,
            time: "1885",
            author: "Friedrich Engels",
            work: "Tư bản tập 2"
        }
    ],
    // Thẻ bẫy để tăng độ khó - chỉ 1 thẻ mỗi loại
    traps: {
        times: ["1859"],
        authors: ["Vladimir Lenin"],
        works: ["Nhà nước và cách mạng"]
    }
};

// Export để sử dụng trong file khác
if (typeof module !== 'undefined' && module.exports) {
    module.exports = gameData;
}