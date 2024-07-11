import { useEffect, useState } from "react";
import { OrderModal, OrderUpdate } from "../../components/modal";
import useOrderStore from "../../store/orders";
import Notification from "../../utils/notification";
import GlobalTable from "../../components/ui/globalTable";
import GlobalPagination from "@globalTable";

const Index = () => {
    const [modal, setModal] = useState(false);
    const [item, setItem] = useState({});
    const { getOrders, data, isLoading, deleteOrder, totalCount } =
        useOrderStore();
    const [params, setParams] = useState({
        page: 1,
        limit: 5,
    });

    const deleteItem = async (id) => {
        const response = await deleteOrder(id);
        if (response.status === 200) {
            Notification({
                title: "Buyurtma muvaffaqiyatli o'chirildi",
                type: "success",
            });
        }
    };

    const editItem = (item) => {
        setModal(true);
        setItem(item);
    };

    const handleClose = () => {
        setModal(false);
        setItem({});
    };

    const handleOpen = () => {
        setModal(true);
    };

    useEffect(() => {
        getOrders(params);
    }, [params]);

    const changePage = (page) => {
        setParams((prevParams) => ({
            ...prevParams,
            page,
        }));
    };

    const headers = [
        { title: "№", value: "index" },
        { title: "Client name", value: "client_name" },
        { title: "Service name", value: "service_name" },
        { title: "Order price", value: "price" },
        { title: "Amount", value: "amount" },
        { title: "Status", value: "status" },
        { title: "Action", value: "action" },
    ];

    return (
        <div>
            <OrderUpdate
                open={modal}
                handleOpen={handleOpen}
                handleClose={handleClose}
                item={item}
            />
            <div className="py-3 flex justify-end items-center">
                <OrderModal />
            </div>
            <GlobalTable
                headers={headers}
                body={data}
                isLoading={isLoading}
                editItem={editItem}
                deleteItem={deleteItem}
            />
            <GlobalPagination
                total={totalCount}
                current={params.page}
                limit={params.limit}
                onPageChange={changePage}
            />
        </div>
    );
};

export default Index;
