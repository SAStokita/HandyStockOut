"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScanLine, Search } from "lucide-react" // Searchアイコンを追加

interface PickingListProps {
  onScanBarcode: (productData: {
    customer: string
    productName: string
    productCode: string
    expiryDate: string
    expectedQuantity: number
    manufacturer: string
    stock: number
  }) => void
  onProductSearch: () => void // 商品検索ボタンのハンドラを追加
}

export default function PickingList({ onScanBarcode, onProductSearch }: PickingListProps) {
  // 仮のピッキングリストデータ
  const [pickingList, setPickingList] = useState([
    {
      id: "p1",
      customer: "ABC商事",
      product: "医薬品（エタノール）",
      manufacturer: "製薬A",
      quantity: 10,
      stock: 15,
      productCode: "PROD001",
      expiryDate: "2025-08-15",
    },
    {
      id: "p2",
      customer: "XYZ工業",
      product: "医療機器（注射器）",
      manufacturer: "医療B",
      quantity: 5,
      stock: 8,
      productCode: "PROD002",
      expiryDate: "2024-03-01",
    },
    {
      id: "p3",
      customer: "ABC商事",
      product: "医薬品（鎮痛剤）",
      manufacturer: "製薬A",
      quantity: 2,
      stock: 5,
      productCode: "PROD003",
      expiryDate: "2025-12-31",
    },
    {
      id: "p4",
      customer: "DEF物産",
      product: "一般品（マスク）",
      manufacturer: "日用品C",
      quantity: 8,
      stock: 10,
      productCode: "PROD004",
      expiryDate: "2025-09-20",
    },
    {
      id: "p5",
      customer: "ABC商事",
      product: "医薬品（胃薬）",
      manufacturer: "製薬A",
      quantity: 7,
      stock: 9,
      productCode: "PROD005",
      expiryDate: "2025-10-01",
    },
    {
      id: "p6",
      customer: "XYZ工業",
      product: "医療機器（体温計）",
      manufacturer: "医療B",
      quantity: 3,
      stock: 4,
      productCode: "PROD006",
      expiryDate: "2025-11-25",
    },
  ])

  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)

  const handleRowClick = (itemId: string) => {
    setSelectedItemId(itemId === selectedItemId ? null : itemId) // トグル選択
  }

  const handleScanButtonClick = () => {
    let productToScan = null
    if (selectedItemId) {
      // 選択されている項目があればそれを使用
      productToScan = pickingList.find((item) => item.id === selectedItemId)
    } else if (pickingList.length > 0) {
      // 選択されていなければリストの最初の項目を使用
      productToScan = pickingList[0]
    }

    if (productToScan) {
      onScanBarcode({
        customer: productToScan.customer,
        productName: productToScan.product,
        productCode: productToScan.productCode,
        expiryDate: productToScan.expiryDate,
        expectedQuantity: productToScan.quantity,
        manufacturer: productToScan.manufacturer,
        stock: productToScan.stock,
      })
    } else {
      alert("ピッキングリストに商品がありません。")
    }
  }

  return (
    <div className="flex flex-col w-[480px] h-[800px] border rounded-lg overflow-hidden shadow-lg bg-[#FAF5E9]">
      {/* ヘッダー */}
      <header className="flex items-center justify-between h-14 px-4 bg-blue-600 text-white">
        <h1 className="text-xl font-bold">出庫処理</h1>
      </header>

      {/* メインコンテンツ */}
      <main className="flex-1 p-4 overflow-auto">
        {/* 納品先名と担当者 */}
        <div className="mb-4 text-base text-gray-800">
          <p>納品先名：ABC商事</p> {/* 仮の納品先名 */}
          <p>担当者：山田太郎</p> {/* 仮の担当者名 */}
        </div>

        {/* 入荷日と出庫予定日 */}
        <div className="mb-4 text-base text-gray-800">
          <p>入荷日：2025/7/30</p>
          <p>出庫予定日：2025/8/30</p>
        </div>

        <Card className="bg-[#FAF5E9]">
          <CardHeader>
            <CardTitle>ピッキングリスト</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader className="bg-gray-200">
                <TableRow>
                  <TableHead>メーカー</TableHead>
                  <TableHead>商品名</TableHead>
                  <TableHead className="text-right">数量</TableHead>
                  <TableHead className="text-right">在庫</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pickingList.map((item) => (
                  <TableRow
                    key={item.id}
                    onClick={() => handleRowClick(item.id)}
                    className={selectedItemId === item.id ? "bg-blue-100" : ""}
                  >
                    <TableCell className="font-medium">{item.manufacturer}</TableCell>
                    <TableCell>{item.product}</TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell className="text-right">{item.stock}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

      {/* フッターボタンエリア */}
      <footer className="p-4 border-t flex flex-col gap-2">
        <Button
          className="w-full bg-blue-600 text-white hover:bg-blue-700"
          onClick={onProductSearch} // 商品検索ボタン
        >
          <Search className="mr-2 h-4 w-4" />
          商品検索
        </Button>
        <Button
          className="w-full bg-white text-blue-600 border border-blue-600 hover:bg-blue-50"
          onClick={handleScanButtonClick}
        >
          <ScanLine className="mr-2 h-4 w-4" />
          商品バーコード読み取り
        </Button>
      </footer>
    </div>
  )
}
