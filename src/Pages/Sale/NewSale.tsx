import React, { useState } from 'react';
import { FiArrowLeft, FiDollarSign, FiPlus } from 'react-icons/fi';
import Loading from '../../Components/Loading';
import { useApi } from '../../Contexts/Api';
import { useAuth } from '../../Contexts/Auth';
import { useHistory } from "react-router-dom";

interface Product{
    id: number;
    name: string;
    price: number;
    stock: number;
    type: string
}

interface Costumer{
    id: number,
    name: string;
    document: string
}

const NewSale: React.FC = () => {
	const { currentUser } = useAuth()
	const { useAxios, Api } = useApi();
	const productData = useAxios<Product[]>("/product");
	const costumerData = useAxios<Costumer[]>("/costumer");
	const [selectedProducts, setSelectedProducts] = useState<Product[]>([])
	const [selectValue, setSelectValue] = useState(0);
	const [amount, setAmount] = useState(0);
	const [paidVal, setPaidVal] = useState(0.00);
	const [costumer_id, setCostumer_Id] = useState(0);
	const [table_num, setTable_Num] = useState(0);
	const [payment, setPayment] = useState("");
	let totalCompra = 0.00;
	let history = useHistory();

	function handleSelectSubmit(event:any){
		event.preventDefault();	
		if(selectValue !== 0 && selectValue && amount !== 0 && amount){
			let selectedProdAux = selectedProducts;
			const prod = productData.data?.filter(product => product.id === selectValue);
			if(prod && prod?.length > 0){
				for (let i = 0; i < amount; i++) {
					selectedProdAux.push(prod[0])
				}
				setSelectedProducts(selectedProdAux);
			}
			setAmount(0);
			setSelectValue(0);
		}else return;
	}

	async function handleSubmit(event:any){
		event.preventDefault();
		//send to sale
		if(selectedProducts.length>0 && payment !== "" && table_num !==0){
			try {
				const saleData = {
					products: selectedProducts,
					seller_name: currentUser?.displayName,
					table_num
				}		
				const accountData = {
					products: selectedProducts,
					costumer_id
				}		
				const reportData = {
					addDebit: payment === "debit"?totalCompra:0,
					addCredit:payment === "credit"?totalCompra:0,
					addCash:payment === "cash"?totalCompra:0,
				}		
				const res = await Api.post("/sale", { 
					saleData,
					accountData,
					reportData
				 });
				alert(res.data.message);
				history.push("/sale");
			} catch (error) {
				alert("An error occurred when trying to reach the server:\n"+error)
			}
		}
		else{
			alert("Please fill the inputs properly")
		}
	}

	if(productData.error) console.log("An error occurred when trying to reach the server:\n"+productData.error);
	if(!productData.data || !costumerData.data) return <Loading/>

	return (
		<>
			<header className="d-flex align-items-center justify-content-between mb-3">
				<div className="d-flex align-items-center">
					<a href="#/sale"><FiArrowLeft size={18} className="text-dark mr-3"/></a>
					<h5 className="mb-0">New sale</h5>
				</div>
				<span className="font-weight-bold text-dark">User: {currentUser?.displayName}</span>
			</header>
			<div className="container rounded-lg bg-light p-4">

				<form onSubmit={handleSelectSubmit}>
					<div className="d-flex align-items-center">
						<div className="m-0">
							<label htmlFor="select">Select:</label>
							<select className="form-control m-0" 
							id="select"
							value={selectValue}
							onChange={(e)=>setSelectValue(parseInt(e.target.value))}>
								<option value={0}>Choose a product/dish</option>
								{
									productData.data?.map((product:Product)=>(
										<option 
										key={`product@${product.id}`} value={product.id.toString()}>{
											product.name}
										</option>
									))
								}
							</select>
						</div>
						<div className="mx-3">
							<label htmlFor="amount">Amount:</label>
							<input type="number" className="form-control" id="amount"
							value={amount.toString()}
							onChange={e => setAmount(parseInt(e.target.value))}
							/>
						</div>
						<button className="btn btn-primary mt-4	" type="submit">
							<FiPlus size={18}/> 
						</button>
					</div>
				</form>

				<table className="table table-sm mt-3">
					<thead className="thead-light">
						<tr>
							<th scope="col">Product</th>
							<th scope="col">Price</th>
						</tr>
					</thead>
					<tbody>
						{
							selectedProducts?.map(
								(product:Product, index) =>{
									totalCompra += product?.price?product.price:0;
									return (
										<tr key={index}>
											<td>{product?.name}</td>
											<td>{product?.price}</td>
										</tr>
									)
								}
							)
						}
					</tbody>
				</table>
				<div className="d-flex">
					<div className="form-group">
						<label htmlFor="paid">Paid:</label>
						<input type="number" value={paidVal} 
						onChange={e => setPaidVal(parseFloat(e.target.value))}
						className="form-control form-control-sm" id="paid"/>
					</div>
					<div className="col">
						<h5 className="mt-2 text-primary">Total: R${totalCompra.toFixed(2)}</h5>
						<h5 className="text-secondary">Change: R${`${(paidVal - totalCompra).toFixed(2)}`}</h5>
					</div>
				</div>
				<div className="border-top container p-0 pt-3">
					<form onSubmit={handleSubmit}>
						<div className="form-group d-flex border-bottom pb-4">
							<div className="d-flex flex-column">
								<label className="mx-0" htmlFor="pay">Payment Method:</label>
								<select id="pay" 
								value={payment}
								onChange={e=>setPayment(e.target.value)}
								className="form-control">
									<option value="">Choose a payment method</option>
									<option value="debit">Debit</option>
									<option value="credit">Credit</option>
									<option value="cash">Cash</option>
								</select>
							</div>
							<div className="d-flex flex-column mx-5">
								<label className="mx-0" htmlFor="table">Table:</label>
								<input type="number" 
								className="form-control" 
								value={table_num}
								onChange={e => setTable_Num(parseInt(e.target.value))}
								id="table"/>
							</div>
							<div className="d-flex flex-column">
								<label className="mx-0" htmlFor="costumer">Costumer:</label>
								<select id="costumer" 
								value={costumer_id}
								onChange={e => setCostumer_Id(parseInt(e.target.value))}
								className="form-control">
									<option value={0}>Choose a costumer</option>
									{
										costumerData.data.map((costumer:Costumer)=>(
											<option value={costumer.id}
											 key={costumer.id}>
												{costumer.name}
											</option>
										))	
									}
								</select>
							</div>
						</div>
						<button className="btn btn-primary" type="submit">
							<FiDollarSign size={18} className="mr-2"/> Finish
						</button>
					</form>
				</div>
			</div>
		</>	
	);
}

export default NewSale;