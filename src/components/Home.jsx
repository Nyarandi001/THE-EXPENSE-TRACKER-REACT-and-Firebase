import {Link, useParams} from "react-router-dom"
import {motion} from "motion/react"
import { ToastContainer, toast } from 'react-toastify';
import {db} from "../config/firebase.js"
import {collection,query,doc,where,getDocs,addDoc,updateDoc,deleteDoc} from "firebase/firestore"
import { useEffect, useRef, useState } from "react"
import { FaSearch, FaTrash } from 'react-icons/fa'; 
import Loading from "./Loading.jsx";
import { MdUnarchive } from "react-icons/md";

const Home=()=>{
  //console.log(useParams())
const {userId,name}=useParams()
//const userId="7888889900"
//const name="Japheth Nyarandi"
const[currentUser,setCurrentUser]=useState({})

const [userRecords,setUserRecords]=useState([])
const [AllUserRecords,setAllUserRecord]=useState([])
const [addRecord,setAddRecord]=useState(false)
const [newRecordTitle,setNewRecordTitle]=useState("")
const [newRecordAmount,setNewRecordAmount]=useState("")
const [newRecordType,setNewRecordType]=useState("")
const [searchQuery,setSearchQuery]=useState()
const   expensesDataCollectionRef = collection(db, 'ExpenseTrackerData');
const [filter,setFilter]=useState("")
const [showAddLoader,setShowAddLoader]=useState(false)
const [showLoader,setShowLoader]=useState(false)
const [DeletingId,setDeletingId]=useState(0)
const [actionType,setActionType]=useState("")
const refAllButton=useRef()
const refExpensesButton=useRef()
const refRevenueButton=useRef()
const [totalRecords,setTotalRecords]=useState(0)
const [totalExpenses,setTotalExpenses]=useState(0)
const [totalRevenues,setTotalRevenues]=useState(0)


useEffect(()=>{
 getUserById(userId)
//FetchAllRecords()
},[])

{/*useEffect(()=>{
   getUserById(userId)
  FetchAllRecords()
   
},[currentUser])
*/
}

const tableVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.5, 
    },
  },
};

const rowVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

async function getUserById(userId){

try{
const q=  query(collection(db,"ExpenseTrackerUsers"),where("userId","==",userId));
const querySnapshot=await getDocs(q);
if(querySnapshot.empty){
 toast.error("No user found")
return null
}
const doc =querySnapshot.docs[0]
const user={
id:doc.id,
...doc.data()
};
setCurrentUser(user)

//toast.success(`FETCHED:doc id${user.id},Name:${user.name}`)
//console.log("USER DETAILS")
//console.log(user)
await FetchAllRecords()
return user;
}
catch(error){
toast.error(`Error fetching user details ${error}`)
return null;
}}

async function updateUser(userId, updatedData) {
  try {
    // Find the user
    const q = query(
      collection(db, "ExpenseTrackerUsers"),
      where("userId", "==", userId)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      toast.error("User not found");
      return null;
    }

    // Get the Firestore document
    const userDoc = querySnapshot.docs[0];

    // Update the document
    await updateDoc(
      doc(db, "ExpenseTrackerUsers", userDoc.id),
      updatedData
    );

    //toast.success("User information updated successfully");

    // Update React state too
    setCurrentUser(prev => ({
      ...prev,
      ...updatedData
    }));

    return true;

  } catch (error) {

    toast.error(`Error updating user: ${error.message}`);
    return false;
  }
}

async function FetchAllRecords(){

  try{
    setUserRecords([])
    setShowLoader(true)
    setFilter("")
    
  const q=query(collection(db,"ExpenseTrackerData"),where("userId","==",userId))
  const querySnapshot=await getDocs(q);
  if(querySnapshot.empty){
  toast.info("No Records Found")
  setUserRecords([])
  return null
  }
  
  const records=querySnapshot.docs.map((doc)=>{
  return{
    ...doc.data(),
  recordKey:doc.id,
  
  }})
  setAllUserRecord(records)
setUserRecords(records);
 const expenseRecords = records.filter(
  (record) => record.nature === "expense"
);

 const RevenueRecords = records.filter(
  (record) => record.nature === "revenue"
);

setTotalRecords(t=>t=records.length)
setTotalExpenses(t=>t=expenseRecords.length)
setTotalRevenues(t=>t=RevenueRecords.length)
setShowLoader(false)

 
  
}
  catch(error){
    setShowLoader(false)
    toast.error(`Error fetching  Records ${error}`)
  }}



async function FetchAllExpenses(){

  try{
    setUserRecords([])
    setShowLoader(true)
    setFilter("Expenses")
  const q=query(collection(db,"ExpenseTrackerData"),where("userId","==",userId))
  const querySnapshot=await getDocs(q);
  if(querySnapshot.empty){
  toast.info("No Records Found")
  setUserRecords([])
  return null
  }
  
  const records=querySnapshot.docs.map((doc)=>{
  return{
    ...doc.data(),
     recordKey:doc.id
  
  }})
  setAllUserRecord(records)
 
  const expenseRecords = records.filter(
  (record) => record.nature === "expense"
);



 const RevenueRecords = records.filter(
  (record) => record.nature === "revenue"
);

setTotalRecords(t=>t=records.length)
setTotalExpenses(t=>t=expenseRecords.length)
setTotalRevenues(t=>t=RevenueRecords.length)


 
setUserRecords(expenseRecords);

setShowLoader(false)

 
  
}
  catch(error){
    setShowLoader(false)
    toast.error(`Error fetching Expenses  Records ${error}`)
  }}





  async function FetchAllRevenues(){

  try{
    setUserRecords([])
    setShowLoader(true)
    setFilter("Revenues")
  const q=query(collection(db,"ExpenseTrackerData"),where("userId","==",userId))
  const querySnapshot=await getDocs(q);
  if(querySnapshot.empty){
  toast.info("No Records Found")
  setUserRecords([])
  return null
  }
  
  const records=querySnapshot.docs.map((doc)=>{
  return {
    ...doc.data(),
  recordKey:doc.id,
  
  }})
  setAllUserRecord(records)
 
  const RevenueRecords = records.filter(
  (record) => record.nature === "revenue"
);

 const expenseRecords = records.filter(
  (record) => record.nature === "expense"
);

setTotalRecords(t=>t=records.length)
setTotalExpenses(t=>t=expenseRecords.length)
setTotalRevenues(t=>t=RevenueRecords.length)
 
setUserRecords(RevenueRecords);

setShowLoader(false)

 
  
}
  catch(error){
    setShowLoader(false)
    toast.error(`Error fetching Revenues ${error}`)
  }}



async function AddRecord(){

      
    if (newRecordTitle === '' || newRecordAmount === '' || newRecordType === '' ) {
      toast.error('Enter all the fields');
      return;
    }


    try {
    setShowAddLoader(true)
const now = new Date();
const dateTimeString = new Intl.DateTimeFormat("en-KE", {
  timeZone: "Africa/Nairobi", // EAT
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
}).format(now);

 

     await addDoc(expensesDataCollectionRef, {
        amount: newRecordAmount,
        doneAt: dateTimeString,
        expenseName:newRecordTitle,
        nature: newRecordType,
        recordId:`EXP:${new Date().getTime()}`,
        userId:userId,
        deleted:false
      });
let total_expenses=0.0;
let total_revenue=0.0;
let total_amount=0.0;
       
      if(newRecordType==="expense"){

         total_expenses=Number(currentUser. totalExpenses) + Number(newRecordAmount)
        // total_amount=Number(currentUser. totalMoney)-Number(newRecordAmount)
         const updateData={...currentUser,totalExpenses: total_expenses,totalMoney:total_amount}
         await updateUser(userId,updateData)

      }

     else if(newRecordType==="revenue"){
     total_revenue=Number(currentUser. totalRevenue) + Number(newRecordAmount)
     //total_amount=Number(currentUser. totalMoney) + Number(newRecordAmount)
     const updateData={...currentUser,totalRevenue:total_revenue,totalMoney:total_amount}
     await updateUser(userId,updateData)

     }
    setNewRecordTitle("")
    setNewRecordAmount("")
    setNewRecordType("")
    setShowAddLoader(false)
    setAddRecord(false)
    toast.success("Record added successfully");
    await getUserById(userId);
    await FetchAllRecords()
     
    } catch (error) {
    setShowAddLoader(false)
      toast.error(`ERROR ADDING RECORD ${error.message}`);
      
    }
  }

 function handleSearch(event) {
  const value = event.target.value;

  setSearchQuery(value);

  if (value.trim() === "") {
    setUserRecords(AllUserRecords);
  } else {
    const filteredSearch = AllUserRecords.filter((record) =>
      record.expenseName
        ?.toLowerCase()
        .includes(value.toLowerCase())
    );

    setUserRecords(filteredSearch);
  }
}

async function DeleteRecord(record) {
  try {
         setDeletingId(record.recordKey);    
         setActionType("Delete")
         let total_expenses=Number(currentUser. totalExpenses);
         let total_revenue=Number(currentUser. totalRevenue);
         
         if(record.nature==="expense" ){
          total_expenses -=  Number(record.amount)
         
         }
          else if(record.nature==="revenue"){
          total_revenue -=  Number(record.amount)
          
         }
        
        
         const updateData={...currentUser,totalExpenses: total_expenses,totalRevenue:total_revenue}
         console.log("RECORD TO UPDATE")
         console.log(updateData)
         await updateUser(userId,updateData)



    // Reference to the specific Firestore document
    const recordRef = doc(db, "ExpenseTrackerData", record.recordKey);

    // Delete the document
   // await deleteDoc(recordRef);

 
    // Mark it as deleted
    await updateDoc(recordRef, {
      deleted: true
    });

       

    if(filter===""){
     await  FetchAllRecords()
    }

    else if(filter==="Expenses"){
     await  FetchAllExpenses()
    }

    else  if(filter==="Revenues"){
     await  FetchAllRevenues()
    }
    setDeletingId(0);    
    setActionType("")
    toast.success("Record deleted successfully");

  } catch (error) {
     setDeletingId(0);    
     setActionType("")
   
    toast.error(`Failed to delete record: ${error.message}`);

  }
}


async function DeleteRecordPermanently(record) {
  try {
         setDeletingId(record.recordKey);    
         setActionType("Delete")
         
    // Reference to the specific Firestore document
    const recordRef = doc(db, "ExpenseTrackerData", record.recordKey);

    // Delete the document
    await deleteDoc(recordRef);

    if(filter===""){
     await  FetchAllRecords()
    }

    else if(filter==="Expenses"){
     await  FetchAllExpenses()
    }

    else  if(filter==="Revenues"){
     await  FetchAllRevenues()
    }
    setDeletingId(0);    
    setActionType("")
    toast.success("Record deleted successfully");

  } catch (error) {
     setDeletingId(0);    
     setActionType("")
    
    toast.error(`Failed to delete record: ${error.message}`);

  }
}



async function UnarchiveRecord(record) {
  try {
         setDeletingId(record.recordKey);    
         setActionType("Unarchive")
         let total_expenses=Number(currentUser. totalExpenses);
         let total_revenue=Number(currentUser. totalRevenue);
         
         if(record.nature==="expense" ){
          total_expenses +=  Number(record.amount)
         
         }
          else if(record.nature==="revenue"){
          total_revenue +=  Number(record.amount)
          
         }
        
        
      const updateData={...currentUser,totalExpenses: total_expenses,totalRevenue:total_revenue}
       
         await updateUser(userId,updateData)



    // Reference to the specific Firestore document
    const recordRef = doc(db, "ExpenseTrackerData", record.recordKey);

    // Delete the document
   // await deleteDoc(recordRef);

 
    // Mark it as deleted
    await updateDoc(recordRef, {
      deleted:false
    });

       

    if(filter===""){
     await  FetchAllRecords()
    }

    else if(filter==="Expenses"){
     await  FetchAllExpenses()
    }

    else  if(filter==="Revenues"){
     await  FetchAllRevenues()
    }
    setDeletingId(0);    
    setActionType("")
    toast.success("Record unarchived successfully");

  } catch (error) {
     setDeletingId(0);    
         setActionType("")
    
    toast.error(`Failed to unarchive record: ${error.message}`);

  }
}


return (
  <div className="flex min-h-screen w-full flex-col gap-5 overflow-x-hidden bg-slate-700 pb-4 text-white">
    <ToastContainer />

    {/* Responsive Header */}
    <motion.header
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="flex w-full flex-col gap-2 bg-slate-900 p-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-5"
    >
      <h1 className="text-center text-lg font-bold sm:text-left sm:text-xl md:text-2xl">
        EXPENSE TRACKER
      </h1>

      <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-end">
        <p className="max-w-full break-words text-sm font-bold sm:text-base md:text-lg">
          Hi, {name}
        </p>

        <Link
          className="rounded-lg bg-white px-4 py-2 text-center text-sm font-bold text-blue-900 transition hover:bg-gray-200 sm:text-base"
          to="/login"
        >
          LOGOUT
        </Link>
      </div>
    </motion.header>

    {/* Account Summary */}
    {Object.keys(currentUser).length === 0 ? (
      <div className="flex justify-center px-4">
        <Loading title="Fetching Records" />
      </div>
    ) : (
      <section className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 sm:gap-5 md:gap-6">
        <div className="flex min-w-0 flex-col items-center gap-3 rounded-xl border-2 bg-white p-4 shadow-lg sm:p-5">
          <p className="text-center text-lg font-bold text-green-700 sm:text-xl md:text-2xl">
            Total Revenue
          </p>
          <h2 className="max-w-full break-words rounded-lg bg-green-700 p-3 text-center font-mono text-xl font-extrabold text-white sm:text-2xl md:text-3xl">
            ${Number(currentUser.totalRevenue ?? 0).toFixed(2)}
          </h2>
        </div>

        <div className="flex min-w-0 flex-col items-center gap-3 rounded-xl border-2 bg-white p-4 shadow-lg sm:p-5">
          <p className="text-center text-lg font-bold text-red-600 sm:text-xl md:text-2xl">
            Total Expenses
          </p>
          <h2 className="max-w-full break-words rounded-lg bg-red-700 p-3 text-center font-mono text-xl font-extrabold text-white sm:text-2xl md:text-3xl">
            ${Number(currentUser.totalExpenses ?? 0).toFixed(2)}
          </h2>
        </div>
      </section>
    )}

    {/* Add Record Section */}
    <section className="w-full px-3 sm:px-5 md:px-6">
      {!addRecord ? (
        <div className="flex justify-center sm:justify-end">
          <motion.button
            animate={{ opacity: [0.5, 1] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            className="min-h-11 w-full rounded-xl bg-green-600 px-5 py-3 font-bold text-white transition hover:bg-green-700 sm:w-auto"
            onClick={() => setAddRecord(true)}
          >
            + Add Record
          </motion.button>
        </div>
      ) : (
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 rounded-2xl bg-gray-500 p-4 shadow-xl sm:gap-5 sm:p-6">
          <h2 className="rounded-xl bg-green-600 p-3 text-center text-xl font-extrabold sm:text-2xl">
            Add a Record
          </h2>

          {showAddLoader && (
            <Loading title="Adding Record" />
          )}

          <form
            className="flex flex-col gap-4 rounded-xl bg-white p-3 sm:gap-5 sm:p-5"
            onSubmit={(event) => {
              event.preventDefault();
              AddRecord();
            }}
          >
            <input
              type="text"
              value={newRecordTitle}
              onChange={(e) => setNewRecordTitle(e.target.value)}
              placeholder="Enter title"
              className="w-full min-w-0 rounded-lg border-2 border-slate-700 p-3 text-base text-black outline-none focus:border-green-600"
              required
            />

            <input
              type="number"
              min="0.01"
              step="0.01"
              value={newRecordAmount}
              onChange={(e) => setNewRecordAmount(e.target.value)}
              placeholder="Amount in USD"
              className="w-full min-w-0 rounded-lg border-2 border-slate-700 p-3 text-base text-black outline-none focus:border-green-600"
              required
            />

            <div className="flex flex-col gap-2 rounded-lg border-2 border-slate-700 p-3 sm:flex-row sm:items-center">
              <label htmlFor="expense_type" className="font-semibold text-gray-600">
                Select Type:
              </label>

              <select
                id="expense_type"
                name="expense_type"
                className="min-h-11 w-full min-w-0 rounded-md border p-2 font-bold text-black sm:flex-1"
                value={newRecordType}
                onChange={(e) => setNewRecordType(e.target.value)}
                required
              >
                <option value="">Select Type Here</option>
                <option value="expense">Expense</option>
                <option value="revenue">Revenue</option>
              </select>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                disabled={showAddLoader}
                className="min-h-11 flex-1 rounded-xl bg-green-700 p-3 font-bold text-white hover:bg-green-800 disabled:opacity-50"
              >
                Submit
              </button>

              <button
                type="button"
                onClick={() => setAddRecord(false)}
                className="min-h-11 flex-1 rounded-xl bg-red-600 p-3 font-bold text-white hover:bg-red-700"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </section>

    {/* Filters */}
    <section className="flex w-full flex-wrap items-center justify-center gap-2 px-3 sm:gap-3 sm:px-5">
      {[
        { label: `All (${totalRecords})`, value: "", action: FetchAllRecords },
        { label: `Expenses (${totalExpenses})`, value: "Expenses", action: FetchAllExpenses },
        { label: `Revenues (${totalRevenues})`, value: "Revenues", action: FetchAllRevenues },
      ].map((item) => (
        <button
          key={item.value || "all"}
          type="button"
          onClick={item.action}
          className={`min-h-11 flex-1 rounded-lg px-3 py-2 text-sm font-bold transition hover:brightness-110 sm:flex-none sm:px-5 sm:text-base ${
            filter === item.value
              ? "bg-red-600 text-white"
              : "bg-blue-700 text-white"
          }`}
        >
          {item.label}
        </button>
      ))}
    </section>

    {/* Search and Records Table */}
    <section className="mx-auto w-full max-w-[1600px] min-w-0 px-2 sm:px-4 md:px-6">
      <div className="rounded-xl bg-red-900 p-2 sm:p-4">
        {showLoader && (
          <div className="mb-3">
            <Loading
              title={
                filter === ""
                  ? "Fetching All Records"
                  : `Fetching ${filter} Records`
              }
            />
          </div>
        )}

        <div className="mb-3 flex w-full min-w-0 items-center rounded-lg border bg-white p-2 sm:p-3">
          <FaSearch className="mr-2 shrink-0 text-gray-500" />

          <input
            type="search"
            placeholder="Search records..."
            aria-label="Search records"
            className="w-full min-w-0 bg-transparent p-1 text-base text-black outline-none"
            value={searchQuery ?? ""}
            onChange={handleSearch}
          />
        </div>

        {userRecords.length === 0 && !showLoader ? (
          <div className="rounded-xl bg-red-500 p-4 text-center font-bold text-white">
            No Records Found. Kindly Add Records.
          </div>
        ) : (
          <div className="w-full max-w-full overflow-x-auto rounded-lg">
            <table className="w-full min-w-[600px] table-fixed border-collapse">
              <thead>
                <tr>
                  <th className="w-[7%] border-2 bg-white p-2 text-center text-sm font-extrabold text-black sm:text-base">
                    #
                  </th>
                  <th className="w-[35%] border-2 bg-white p-2 text-left text-sm font-extrabold text-black sm:text-base">
                    Title
                  </th>
                  <th className="w-[17%] border-2 bg-white p-2 text-center text-sm font-extrabold text-black sm:text-base">
                    Nature
                  </th>
                  <th className="w-[21%] border-2 bg-white p-2 text-center text-sm font-extrabold text-black sm:text-base">
                    Amount (USD)
                  </th>
                  <th className="w-[20%] border-2 bg-white p-2 text-center text-sm font-extrabold text-black sm:text-base">
                    Action
                  </th>
                </tr>
              </thead>

              <motion.tbody
                key={filter}
                variants={tableVariants}
                initial="hidden"
                animate="visible"
              >
                {userRecords.map((record, index) => (
                  <motion.tr
                    key={record.recordKey || record.id || index}
                    variants={rowVariants}
                    className="border-2 bg-white text-sm text-blue-900 hover:bg-gray-100 sm:text-base md:text-lg"
                  >
                    <td
                      className={`break-words border-2 p-2 text-center ${
                        record.deleted ? "line-through" : ""
                      }`}
                    >
                      {index + 1}
                    </td>

                    <td
                      className={`break-words border-2 p-2 ${
                        record.deleted ? "line-through" : ""
                      }`}
                    >
                      {record.expenseName}
                    </td>

                    <td
                      className={`break-words border-2 p-2 text-center ${
                        record.nature === "expense"
                          ? "bg-red-500 text-white"
                          : "bg-green-500 text-white"
                      } ${record.deleted ? "line-through" : ""}`}
                    >
                      {record.nature}
                    </td>

                    <td
                      className={`break-words border-2 p-2 text-center ${
                        record.deleted ? "line-through" : ""
                      }`}
                    >
                      {Number(record.amount).toFixed(2)}
                    </td>

                    <td className="border-2 p-2 text-center">
                      {DeletingId === record.recordKey ? (
                        <p
                          className={`mb-2 break-words rounded-lg p-2 text-xs font-bold text-white sm:text-sm ${
                            actionType === "Delete"
                              ? "bg-red-800"
                              : "bg-green-800"
                          }`}
                        >
                          {actionType === "Delete"
                            ? "Deleting..."
                            : "Unarchiving..."}
                        </p>
                      ) : (
                        <div className="flex flex-wrap items-center justify-center gap-3">
                          {record.deleted && (
                            <button
                              type="button"
                              aria-label="Restore record"
                              title="Restore record"
                              onClick={() => UnarchiveRecord(record)}
                              className="rounded p-1 text-green-700 hover:bg-green-100"
                            >
                              <MdUnarchive size={22} />
                            </button>
                          )}

                          <button
                            type="button"
                            aria-label={
                              record.deleted
                                ? "Delete permanently"
                                : "Archive record"
                            }
                            title={
                              record.deleted
                                ? "Delete permanently"
                                : "Archive record"
                            }
                            onClick={() =>
                              record.deleted
                                ? DeleteRecordPermanently(record)
                                : DeleteRecord(record)
                            }
                            className="rounded p-1 text-red-600 hover:bg-red-100"
                          >
                            <FaTrash size={20} />
                          </button>
                        </div>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </motion.tbody>
            </table>
          </div>
        )}
      </div>
    </section>

    {/* Responsive Footer - stays in normal document flow */}
    <motion.footer
      animate={{ opacity: [0.5, 1] }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
      className="mt-auto w-full bg-black px-3 py-4 text-center text-xs font-bold sm:px-5 sm:text-sm md:text-base lg:text-lg"
    >
      <p>© 2026 Expense Tracker built by Japheth Nyarandi</p>
    </motion.footer>
  </div>
)}
export default Home