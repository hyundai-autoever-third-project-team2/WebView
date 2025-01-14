import Toolbar from "components/common/Toolbar";
import StatMenu from "./components/StatMenu";
import { useNavigate } from "react-router-dom";

function RegisterHistoryPage() {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/my')
    }

    return(
        <>
            <Toolbar showBackButton title="판매 내역" onBackClick={handleBackClick}/>
            <StatMenu items={[
                {
                    value: 0,
                    label: "시세 측정 중"
                },
                {
                    value: 0,
                    label: "판매 완료"
                },
                {
                    value: 0,
                    label: "취소"
                },
            ]}/>
        </>
    )


}

export default RegisterHistoryPage;