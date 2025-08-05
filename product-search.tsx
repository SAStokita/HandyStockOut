"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronLeft } from "lucide-react"

interface ProductSearchProps {
  onProductSelect: (productData: {
    productName: string
    productCode: string
    manufacturer: string
    supplier: string
    expiryDate: string // 追加
    expectedQuantity: number // 追加
    stock: number // 追加
  }) => void
  onBack: () => void
}

interface SearchProduct {
  id: string
  manufacturerCode: string
  supplierCode: string
  productCode: string
  productName: string
  manufacturer: string
  supplier: string
}

export default function ProductSearch({ onProductSelect, onBack }: ProductSearchProps) {
  const [manufacturerCode, setManufacturerCode] = useState("")
  const [supplierCode, setSupplierCode] = useState("")
  const [productCode, setProductCode] = useState("")
  const [productName, setProductName] = useState("")
  const [searchResults, setSearchResults] = useState<SearchProduct[]>([])

  // 仮の全商品データ
  const allProducts: SearchProduct[] = [
    {
      id: "s1",
      manufacturerCode: "M001",
      supplierCode: "S001",
      manufacturer: "製薬A",
      supplier: "ABC薬品",
      productCode: "ITEM001",
      productName: "医薬品（エタノール）",
    },
    {
      id: "s2",
      manufacturerCode: "M002",
      supplierCode: "S002",
      manufacturer: "医療B",
      supplier: "XYZ製薬",
      productCode: "ITEM002",
      productName: "医療機器（注射器）",
    },
    {
      id: "s3",
      manufacturerCode: "M001",
      supplierCode: "S003",
      manufacturer: "製薬A",
      supplier: "DEF商事",
      productCode: "ITEM003",
      productName: "医薬品（イソジン液）",
    },
    {
      id: "s4",
      manufacturerCode: "M003",
      supplierCode: "S001",
      manufacturer: "日用品C",
      supplier: "ABC薬品",
      productCode: "ITEM004",
      productName: "一般品（絆創膏）",
    },
    {
      id: "s5",
      manufacturerCode: "M004",
      supplierCode: "S004",
      manufacturer: "健康堂",
      supplier: "健康堂",
      productCode: "ITEM005",
      productName: "医薬品（風邪薬A）",
    },
  ]

  const handleSearch = () => {
    const filteredResults = allProducts.filter((product) => {
      const matchesManufacturerCode = manufacturerCode ? product.manufacturerCode.includes(manufacturerCode) : true
      const matchesSupplierCode = supplierCode ? product.supplierCode.includes(supplierCode) : true
      const matchesProductCode = productCode ? product.productCode.includes(productCode) : true
      const matchesProductName = productName ? product.productName.includes(productName) : true
      return matchesManufacturerCode && matchesSupplierCode && matchesProductCode && matchesProductName
    })
    setSearchResults(filteredResults)
  }

  const handleProductRowClick = (product: SearchProduct) => {
    // 検索結果から選択された商品をQuantityInputに渡す
    onProductSelect({
      productName: product.productName,
      productCode: product.productCode,
      manufacturer: product.manufacturer,
      supplier: product.supplier,
      expiryDate: "2025-11-30", // 適当なダミーデータ
      expectedQuantity: 20, // 適当なダミーデータ
      stock: 50, // 適当なダミーデータ
    })
  }

  return (
    <div className="flex flex-col w-[480px] h-[800px] border rounded-lg overflow-hidden shadow-lg bg-[#FAF5E9]">
      {/* ヘッダー */}
      <header className="flex items-center justify-between h-14 px-4 bg-blue-600 text-white">
        <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:bg-blue-500">
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">戻る</span>
        </Button>
        <h1 className="text-xl font-bold flex-1 text-center mr-10">商品検索</h1>
      </header>

      {/* メインコンテンツ */}
      <main className="flex-1 p-4 overflow-auto">
        <Card className="bg-[#FAF5E9] p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="manufacturerCode">メーカーコード</Label>
              <Input
                id="manufacturerCode"
                placeholder="メーカーコード"
                value={manufacturerCode}
                onChange={(e) => setManufacturerCode(e.target.value)}
                className="bg-white"
              />
            </div>
            <div>
              <Label htmlFor="supplierCode">仕入先コード</Label>
              <Input
                id="supplierCode"
                placeholder="仕入先コード"
                value={supplierCode}
                onChange={(e) => setSupplierCode(e.target.value)}
                className="bg-white"
              />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="productCode">商品コード</Label>
              <Input
                id="productCode"
                placeholder="商品コード"
                value={productCode}
                onChange={(e) => setProductCode(e.target.value)}
                className="bg-white"
              />
            </div>
            <div>
              <Label htmlFor="productName">商品名</Label>
              <Input
                id="productName"
                placeholder="部分一致"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="bg-white"
              />
            </div>
          </div>
          <Button onClick={handleSearch} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            検索
          </Button>
        </Card>

        {/* 検索結果テーブル (searchResultsがある場合のみ表示) */}
        {searchResults.length > 0 && (
          <Card className="bg-[#FAF5E9] mt-4">
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-gray-200">
                  <TableRow>
                    <TableHead>メーカー</TableHead>
                    <TableHead>仕入先</TableHead>
                    <TableHead>商品コード</TableHead>
                    <TableHead>商品名</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {searchResults.map((product) => (
                    <TableRow key={product.id} onClick={() => handleProductRowClick(product)}>
                      <TableCell>{product.manufacturer}</TableCell>
                      <TableCell>{product.supplier}</TableCell>
                      <TableCell>{product.productCode}</TableCell>
                      <TableCell>{product.productName}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
        {/* 検索結果が0件の場合のメッセージ (検索ボタン押下後のみ) */}
        {searchResults.length === 0 && (manufacturerCode || supplierCode || productCode || productName) && (
          <p className="text-center text-gray-500 mt-4">検索結果がありません</p>
        )}
      </main>
    </div>
  )
}
