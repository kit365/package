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
        works: ["Nhà nước và cách mạng"]
    },
    
    // Chi tiết cho từng cột mốc
    details: {
        1: {
            title: "1844 - Luận cương về Feuerbach",
            author: "Karl Marx",
            content: `
                <p><strong>Tác giả:</strong> Karl Marx</p>
                <p><strong>Năm:</strong> 1844</p>
                <p><strong>Bối cảnh:</strong> Marx viết tác phẩm này sau khi rời Đức sang Paris, chịu ảnh hưởng của chủ nghĩa xã hội Pháp và kinh tế chính trị Anh.</p>
                <p><strong>Nội dung chính:</strong></p>
                <ul>
                    <li>Phê phán chủ nghĩa duy tâm của Hegel và Feuerbach</li>
                    <li>Đặt nền móng cho chủ nghĩa duy vật lịch sử</li>
                    <li>Đề ra phương pháp cách mạng thực tiễn</li>
                    <li>Luận cương nổi tiếng: "Các nhà triết học chỉ giải thích thế giới bằng nhiều cách khác nhau, vấn đề là thay đổi nó"</li>
                </ul>
                <p><strong>Ý nghĩa:</strong> Đánh dấu bước chuyển biến quan trọng từ chủ nghĩa duy tâm sang chủ nghĩa duy vật lịch sử.</p>
            `
        },
        2: {
            title: "1848 - Tuyên ngôn của Đảng Cộng sản",
            author: "Karl Marx & Friedrich Engels",
            content: `
                <p><strong>Tác giả:</strong> Karl Marx & Friedrich Engels</p>
                <p><strong>Năm:</strong> 1848</p>
                <p><strong>Bối cảnh:</strong> Được viết cho Liên đoàn Cộng sản, trong bối cảnh các cuộc cách mạng 1848 bùng nổ khắp châu Âu.</p>
                <p><strong>Nội dung chính:</strong></p>
                <ul>
                    <li>Phân tích lịch sử đấu tranh giai cấp</li>
                    <li>Phê phán chủ nghĩa tư bản và chế độ tư hữu</li>
                    <li>Đề ra mục tiêu: "Vô sản toàn thế giới, đoàn kết lại!"</li>
                    <li>Kêu gọi thành lập chế độ cộng sản</li>
                </ul>
                <p><strong>Ý nghĩa:</strong> Tài liệu cương lĩnh đầu tiên của phong trào công nhân quốc tế, có ảnh hưởng sâu rộng đến các cuộc cách mạng sau này.</p>
            `
        },
        3: {
            title: "1850s-1860s - Phát triển lý luận kinh tế và triết học",
            author: "Karl Marx",
            content: `
                <p><strong>Tác giả:</strong> Karl Marx</p>
                <p><strong>Thời kỳ:</strong> 1850s-1860s</p>
                <p><strong>Bối cảnh:</strong> Marx sống lưu vong ở London, nghiên cứu sâu về kinh tế chính trị tại Thư viện Anh.</p>
                <p><strong>Nội dung chính:</strong></p>
                <ul>
                    <li>Nghiên cứu sâu về phương thức sản xuất tư bản chủ nghĩa</li>
                    <li>Phát triển học thuyết giá trị thặng dư</li>
                    <li>Hoàn thiện phương pháp duy vật biện chứng</li>
                    <li>Chuẩn bị cho bộ "Tư bản"</li>
                </ul>
                <p><strong>Ý nghĩa:</strong> Giai đoạn chuẩn bị quan trọng cho những tác phẩm kinh điển sau này của Marx.</p>
            `
        },
        4: {
            title: "1867 - Tư bản tập 1",
            author: "Karl Marx",
            content: `
                <p><strong>Tác giả:</strong> Karl Marx</p>
                <p><strong>Năm:</strong> 1867</p>
                <p><strong>Bối cảnh:</strong> Xuất bản sau 20 năm nghiên cứu, trong bối cảnh cách mạng công nghiệp đang phát triển mạnh.</p>
                <p><strong>Nội dung chính:</strong></p>
                <ul>
                    <li>Phân tích hàng hóa và giá trị</li>
                    <li>Học thuyết giá trị thặng dư</li>
                    <li>Quy luật tích lũy tư bản</li>
                    <li>Phê phán phương thức sản xuất tư bản chủ nghĩa</li>
                </ul>
                <p><strong>Ý nghĩa:</strong> Tác phẩm kinh điển nhất của Marx, phân tích sâu sắc về quy luật vận động của chủ nghĩa tư bản.</p>
            `
        },
        5: {
            title: "1870s-1880s - Hoàn thiện và phổ biến tư tưởng",
            author: "Karl Marx & Friedrich Engels",
            content: `
                <p><strong>Tác giả:</strong> Karl Marx & Friedrich Engels</p>
                <p><strong>Thời kỳ:</strong> 1870s-1880s</p>
                <p><strong>Bối cảnh:</strong> Marx và Engels hoạt động tích cực trong các tổ chức công nhân quốc tế.</p>
                <p><strong>Nội dung chính:</strong></p>
                <ul>
                    <li>Thành lập và lãnh đạo Quốc tế I (1864-1876)</li>
                    <li>Hoàn thiện học thuyết cách mạng</li>
                    <li>Phổ biến tư tưởng trong phong trào công nhân</li>
                    <li>Chuẩn bị cho các cuộc cách mạng xã hội chủ nghĩa</li>
                </ul>
                <p><strong>Ý nghĩa:</strong> Giai đoạn phổ biến và thực tiễn hóa học thuyết Marx trong phong trào công nhân quốc tế.</p>
            `
        },
        6: {
            title: "1875 - Phê phán Cương lĩnh Gotha",
            author: "Karl Marx",
            content: `
                <p><strong>Tác giả:</strong> Karl Marx</p>
                <p><strong>Năm:</strong> 1875</p>
                <p><strong>Bối cảnh:</strong> Viết để phê phán cương lĩnh của Đảng Xã hội Dân chủ Đức tại Đại hội Gotha.</p>
                <p><strong>Nội dung chính:</strong></p>
                <ul>
                    <li>Phê phán những sai lầm trong cương lĩnh của Đảng</li>
                    <li>Nêu ra lý luận về hai giai đoạn của chủ nghĩa xã hội</li>
                    <li>Làm rõ mối quan hệ giữa dân chủ và chủ nghĩa xã hội</li>
                    <li>Đề ra nguyên tắc phân phối trong xã hội mới</li>
                </ul>
                <p><strong>Ý nghĩa:</strong> Làm rõ con đường và phương pháp xây dựng chủ nghĩa xã hội, có ảnh hưởng lớn đến các đảng cộng sản sau này.</p>
            `
        },
        7: {
            title: "1885 - Tư bản tập 2",
            author: "Friedrich Engels",
            content: `
                <p><strong>Tác giả:</strong> Friedrich Engels (biên tập từ bản thảo của Marx)</p>
                <p><strong>Năm:</strong> 1885</p>
                <p><strong>Bối cảnh:</strong> Marx qua đời năm 1883, Engels biên tập và xuất bản tập 2 từ bản thảo để lại.</p>
                <p><strong>Nội dung chính:</strong></p>
                <ul>
                    <li>Phân tích quá trình lưu thông của tư bản</li>
                    <li>Học thuyết về chu chuyển tư bản</li>
                    <li>Phân tích tái sản xuất mở rộng</li>
                    <li>Quy luật vận động của tư bản trong lưu thông</li>
                </ul>
                <p><strong>Ý nghĩa:</strong> Bổ sung quan trọng cho tập 1, hoàn thiện học thuyết kinh tế chính trị Marx.</p>
            `
        }
    }
};

// Export để sử dụng trong file khác
if (typeof module !== 'undefined' && module.exports) {
    module.exports = gameData;
}