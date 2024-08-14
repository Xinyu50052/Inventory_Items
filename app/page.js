'use client'

import { useState, useEffect } from 'react'
import { Box, Modal, Typography, Stack, TextField, Button } from '@mui/material'
import { firestore } from '@/firebase'
import { collection, deleteDoc, doc, getDocs, getDoc, setDoc, query } from 'firebase/firestore'

export default function Home() {
  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState(false)
  const [itemName, setItemName] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const updateInventory = async () => {
    if (typeof window !== 'undefined') {
      const snapshot = query(collection(firestore, 'inventory'))
      const docs = await getDocs(snapshot)
      const inventoryList = []
      docs.forEach((doc) => {
        inventoryList.push({ name: doc.id, ...doc.data() })
      })
      setInventory(inventoryList)
    }
  }

  const addItem = async (item) => {
    if (typeof window !== 'undefined') {
      const docRef = doc(collection(firestore, 'inventory'), item)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const { quantity } = docSnap.data()
        await setDoc(docRef, { quantity: quantity + 1 })
      } else {
        await setDoc(docRef, { quantity: 1 })
      }
      await updateInventory()
    }
  }

  const removeItem = async (item) => {
    if (typeof window !== 'undefined') {
      const docRef = doc(collection(firestore, 'inventory'), item)
      await deleteDoc(docRef)
      await updateInventory()
    }
  }

  const increaseQuantity = async (item) => {
    if (typeof window !== 'undefined') {
      const docRef = doc(collection(firestore, 'inventory'), item)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const { quantity } = docSnap.data()
        await setDoc(docRef, { quantity: quantity + 1 })
        await updateInventory()
      }
    }
  }

  const decreaseQuantity = async (item) => {
    if (typeof window !== 'undefined') {
      const docRef = doc(collection(firestore, 'inventory'), item)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const { quantity } = docSnap.data()
        if (quantity > 1) {
          await setDoc(docRef, { quantity: quantity - 1 })
        } else {
          await deleteDoc(docRef)
        }
        await updateInventory()
      }
    }
  }

  useEffect(() => {
    updateInventory()
  }, [])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }

  const filteredInventory = inventory.filter(({ name }) =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Box
      width="calc(100vw - 20px)"
      height="calc(100vh - 20px)"
      display={'flex'}
      justifyContent={'center'}
      flexDirection={'column'}
      alignItems={'center'}
      gap={0}
      margin={1}
      padding={0}
    >
      <Box width="100%" height="100%" border={'1px solid #333'}>
        <Box
          width="100%"
          height="100px"
          bgcolor={'#1A9F04'}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          paddingX={5}
          flexDirection="column"
        >
          <Typography variant={'h3'} color={'#fff'} textAlign={'center'}>
            Inventory Items
          </Typography>
        </Box>
        <Box paddingX={5} paddingY={2}>
          <Box display="flex" alignItems="center" gap={1}>
            <TextField
              variant="outlined"
              label="Search Items"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ flex: 1, maxWidth: '3000px' }}
            />
            <Button
              variant="contained"
              onClick={handleOpen}
              style={{ backgroundColor: '#4CAF50' }}
            >
              Add New Item
            </Button>
          </Box>
        </Box>
        <Stack width="100%" height="calc(100vh - 200px)" spacing={0} overflow={'auto'}>
          {filteredInventory.map(({ name, quantity }, index) => {
            const isGreenBackground = index % 2 === 0
            return (
              <Box
                key={name}
                width="100%"
                minHeight="75px"
                display={'flex'}
                alignItems={'center'}
                bgcolor={isGreenBackground ? '#83CA76' : '#f0f0f0'}
                paddingX={3}
                paddingY={1}
                justifyContent="space-between"
              >
                <Typography variant={'body1'} color={isGreenBackground ? '#fff' : '#333'} style={{ flex: 1 }}>
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Typography>
                <Box display="flex" alignItems={'center'} gap={1}>
                  <Button
                    variant="outlined"
                    style={{
                      borderRadius: '50%',
                      minWidth: '30px',
                      padding: '0',
                      height: '30px',
                      width: '30px',
                      fontSize: '16px',
                      borderColor: isGreenBackground ? '#4CAF50' : '#fff',
                      color: isGreenBackground ? '#4CAF50' : '#fff',
                      backgroundColor: isGreenBackground ? '#fff' : '#4CAF50',
                      transition: 'background-color 0.3s'
                    }}
                    onClick={() => decreaseQuantity(name)}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = isGreenBackground ? '#c7c5c5' : '#3a8a3d'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = isGreenBackground ? '#fff' : '#4CAF50'}
                  >
                    -
                  </Button>
                  <Typography variant={'body1'} color={isGreenBackground ? '#fff' : '#333'} style={{ margin: '0 5px' }}>
                    {quantity}
                  </Typography>
                  <Button
                    variant="outlined"
                    style={{
                      borderRadius: '50%',
                      minWidth: '30px',
                      padding: '0',
                      height: '30px',
                      width: '30px',
                      fontSize: '16px',
                      borderColor: isGreenBackground ? '#4CAF50' : '#fff',
                      color: isGreenBackground ? '#4CAF50' : '#fff',
                      backgroundColor: isGreenBackground ? '#fff' : '#4CAF50',
                      transition: 'background-color 0.3s'
                    }}
                    onClick={() => increaseQuantity(name)}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = isGreenBackground ? '#c7c5c5' : '#3a8a3d'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = isGreenBackground ? '#fff' : '#4CAF50'}
                  >
                    +
                  </Button>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#C70039' }}
                    onClick={() => removeItem(name)}
                  >
                    Remove
                  </Button>
                </Box>
              </Box>
            )
          })}
        </Stack>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Item
          </Typography>
          <Stack width="100%" direction={'row'} spacing={2}>
            <TextField
              id="outlined-basic"
              label="Item"
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Button
              variant="outlined"
              style={{ borderColor: '#4CAF50', color: '#4CAF50' }}
              onClick={() => {
                if (itemName.trim()) {
                  addItem(itemName)
                  setItemName('')
                  handleClose()
                }
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Box>
  )
}
