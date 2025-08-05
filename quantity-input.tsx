"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CalendarDays, Package, ChevronLeft } from "lucide-react"

interface QuantityInputProps {
  product: {
    productName: string
    productCode: string
    expiryDate?: string // 検索からの場合は存在しない可能性
    expectedQuantity?: number // 検索からの場合は存在しない可能性
    customer?: string // 検索からの場合は存在しない可能性
    manufacturer: string
    stock?: number // 検索からの場合は存在しない可能性
    supplier?: string // 検索からの場合のみ
  }
  onCancel: () => void
  onNext: (inputQuantity: number) => void
}

export default function QuantityInput({ product, onCancel, onNext }: QuantityInputProps) {
  const [inputQuantity, setInputQuantity] = useState<string>("")
  const [error, setError] = useState<string | null>(null)

  const isExpiryDateWarning = (dateString?: string) => {
    if (!dateString) return false // 日付がない場合は警告なし
    const expiry = new Date(dateString)
    const now = new Date()
    return expiry.getTime() <= now.getTime() || (expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24) <= 30
  }

  const handleNextClick = () => {
    const quantity = Number.parseInt(inputQuantity, 10)
    if (isNaN(quantity) || inputQuantity.trim() === "") {
      setError("出荷数量は必須入力です。")
      return
    }
    setError(null)
    onNext(quantity)
  }

  return (
    <div className="flex flex-col w-[480px] h-[800px] border rounded-lg overflow-hidden shadow-lg bg-[#FAF5E9]">
      {/* ヘッダー */}
      <header className="flex items-center justify-between h-14 px-4 bg-blue-600 text-white">
        <h1 className="text-xl font-bold">出庫数量入力</h1>
      </header>

      {/* メインコンテンツ */}
      <main className="flex-1 p-4 overflow-auto flex items-start justify-center">
        <Card className="w-full max-w-md bg-[#FAF5E9] p-4 space-y-4">
          {/* 商品情報ヘッダー */}
          <div className="flex items-center gap-2 mb-4">
            <Package className="h-5 w-5 text-gray-700" />
            <h2 className="text-lg font-bold">商品情報</h2>
          </div>

          {/* メーカー */}
          <div className="flex justify-between items-center border-b pb-2">
            <Label htmlFor="manufacturer" className="text-base font-normal">
              メーカー
            </Label>
            <span id="manufacturer" className="text-base font-bold">
              {product.manufacturer || "N/A"}
            </span>
          </div>

          {/* 商品名 */}
          <div className="flex justify-between items-center border-b pb-2">
            <Label htmlFor="productName" className="text-base font-normal">
              商品名
            </Label>
            <span id="productName" className="text-base font-bold">
              {product.productName}
            </span>
          </div>

          {/* 商品コード */}
          <div className="flex justify-between items-center border-b pb-2">
            <Label htmlFor="productCode" className="text-base font-normal">
              商品コード
            </Label>
            <span id="productCode" className="text-base font-bold">
              {product.productCode}
            </span>
          </div>

          {/* 使用期限 */}
          <div className="flex justify-between items-center border-b pb-2">
            <Label htmlFor="expiryDate" className="text-base font-normal flex items-center gap-1">
              <CalendarDays className="h-4 w-4 text-gray-500" />
              使用期限
            </Label>
            <span
              id="expiryDate"
              className={`text-base font-bold ${isExpiryDateWarning(product.expiryDate) ? "text-red-500" : ""}`}
            >
              {product.expiryDate || "N/A"}
              {isExpiryDateWarning(product.expiryDate) && " (使用期限が近いです)"}
            </span>
          </div>

          {/* 出庫予定数量 */}
          <div className="flex justify-between items-center border-b pb-2">
            <Label htmlFor="expectedQuantity" className="text-base font-normal">
              出庫予定数量
            </Label>
            <span id="expectedQuantity" className="text-base font-bold">
              {product.expectedQuantity !== undefined ? product.expectedQuantity : "N/A"}
            </span>
          </div>

          {/* 在庫 */}
          <div className="flex justify-between items-center border-b pb-2">
            <Label htmlFor="stock" className="text-base font-normal">
              在庫
            </Label>
            <span id="stock" className="text-base font-bold">
              {product.stock !== undefined ? product.stock : "N/A"}
            </span>
          </div>

          {/* 出荷数量（入力フィールド） */}
          <div className="space-y-2 mt-4">
            <Label htmlFor="inputQuantity" className="text-base font-normal">
              出荷数量 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="inputQuantity"
              type="number"
              value={inputQuantity}
              onChange={(e) => {
                setInputQuantity(e.target.value)
                setError(null) // 入力時にエラーをクリア
              }}
              placeholder="数量を入力"
              required
              className="w-full bg-white"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        </Card>
      </main>

      {/* フッターボタンエリア */}
      <footer className="p-4 border-t flex justify-around gap-4">
        <Button
          variant="outline"
          onClick={onCancel}
          className="flex-1 bg-white text-blue-600 border border-blue-600 hover:bg-blue-50"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          戻る
        </Button>
        <Button onClick={handleNextClick} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
          確認画面へ
        </Button>
      </footer>
    </div>
  )
}
